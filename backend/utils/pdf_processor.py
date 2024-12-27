from transformers import pipeline
import PyPDF2
import re

def chunk_text(text, max_length=400):
    """Split text into smaller chunks"""
    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks = []
    current_chunk = []
    current_length = 0
    
    for sentence in sentences:
        if current_length + len(sentence) > max_length:
            if current_chunk:
                chunks.append(' '.join(current_chunk))
            current_chunk = [sentence]
            current_length = len(sentence)
        else:
            current_chunk.append(sentence)
            current_length += len(sentence)
            
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    return chunks

def process_pdf(filepath):
    """Extract text from PDF and generate flashcards"""
    question_generator = pipeline(
        "text2text-generation",
        model="google/flan-t5-base",
        max_length=64
    )

    # Extract text
    text_content = ""
    with open(filepath, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            text = page.extract_text()
            if text:
                text_content += text

    if not text_content.strip():
        raise ValueError("No text could be extracted from the PDF.")

    # Process text in chunks
    chunks = chunk_text(text_content)
    flashcards = []

    for chunk in chunks[:10]:
        try:
            output = question_generator(
                f"generate question: {chunk}",
                do_sample=False
            )
            flashcards.append({
                'question': output[0]['generated_text'],
                'answer': chunk
            })
        except Exception as e:
            print(f"Error generating question: {e}")
            continue

    if not flashcards:
        raise ValueError("No flashcards could be generated.")

    return flashcards
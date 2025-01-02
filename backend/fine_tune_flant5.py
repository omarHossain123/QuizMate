from datasets import load_dataset
from transformers import AutoTokenizer
from transformers import TrainingArguments
from transformers import AutoModelForSeq2SeqLM, Trainer


# Load the SQuAD dataset
dataset = load_dataset("squad")

# Inspect the data (optional, for understanding the structure)
print("Sample entry from training data:", dataset["train"][0])

# Load the tokenizer for the FLAN-T5 model
tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")

# Preprocess the dataset
def preprocess_function(examples):
    # Tokenize the input text and labels with padding and truncation
    inputs = examples["context"]
    targets = examples["question"]
    model_inputs = tokenizer(
        inputs,
        max_length=512,  # Limit input length
        padding="max_length",  # Pad to max length
        truncation=True,  # Truncate if exceeds max length
    )
    labels = tokenizer(
        targets,
        max_length=128,  # Limit target (output) length
        padding="max_length",  # Pad to max length
        truncation=True,  # Truncate if exceeds max length
    )
    model_inputs["labels"] = labels["input_ids"]
    return model_inputs

# Apply preprocessing to the dataset
tokenized_dataset = dataset.map(preprocess_function, batched=True)

from transformers import TrainingArguments

# Define training arguments
training_args = TrainingArguments(
    output_dir="./fine_tuned_flan_t5",  # Directory to save the model
    evaluation_strategy="epoch",       # Evaluate the model at the end of each epoch
    learning_rate=5e-5,                # Initial learning rate
    per_device_train_batch_size=8,     # Batch size for training
    per_device_eval_batch_size=8,      # Batch size for evaluation
    num_train_epochs=3,                # Total number of training epochs
    weight_decay=0.01,                 # Strength of weight decay for regularization
    save_strategy="epoch",             # Save the model at the end of each epoch
    save_total_limit=2,                # Limit the number of saved checkpoints
    logging_dir="./logs",              # Directory for logging training progress
    logging_steps=500,                 # Log every 500 steps
    load_best_model_at_end=True,       # Load the best model at the end of training
    metric_for_best_model="eval_loss", # Use evaluation loss to identify the best model
)


# Load the pre-trained FLAN-T5 model
model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-base")

# Split the tokenized dataset into training and validation sets
train_dataset = tokenized_dataset["train"]
eval_dataset = tokenized_dataset["validation"]

# Initialize the Trainer
trainer = Trainer(
    model=model,                          # The model to fine-tune
    args=training_args,                   # Training arguments
    train_dataset=train_dataset,          # Training dataset
    eval_dataset=eval_dataset,            # Validation dataset
    tokenizer=tokenizer,                  # Tokenizer used for preprocessing
)

# Start fine-tuning
trainer.train()

# Save the fine-tuned model
model.save_pretrained("./fine_tuned_flan_t5")
tokenizer.save_pretrained("./fine_tuned_flan_t5")

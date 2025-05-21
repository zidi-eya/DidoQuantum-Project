from sentence_transformers import SentenceTransformer, util
import torch

model = SentenceTransformer("all-MiniLM-L6-v2")

def encode_text(text: str) -> torch.Tensor:
    return model.encode(text, convert_to_tensor=True)

def compute_similarity(embedding1: torch.Tensor, embedding2: torch.Tensor) -> float:
    return util.pytorch_cos_sim(embedding1, embedding2).item()

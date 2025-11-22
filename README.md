# navigating_USF

# 🧭 USF SmartNav: The Vague Direction Agent
**Track 2 Submission: AI Innovation / Everyday AI**

> *"I don't know where 'CGS' is. I just want coffee near the library."*

---

## 💡 The Problem
Existing campus maps assume you know exactly where you are going. They require specific building names (e.g., "ENC 1002") and specific starting points. However, in everyday student life, needs are **vague** and **context-dependent**. Students search for *resources* (food, quiet study, printers), not just coordinates.

## 🤖 The Solution
**USF SmartNav** is an AI-powered agent that bridges the gap between natural language and spatial navigation. Instead of hard-coding locations, we use a Large Language Model (LLM) to interpret user intent and constraints, then use Graph Algorithms to find the optimal path.

### Key Features
* **Intent Recognition:** Understands abstract goals like "I'm hungry" vs "I need to study."
* **Constraint Handling:** Processes logic like "I only have 10 minutes" or "Must be near the library."
* **Visual & Audio Output:** Generates a dynamic map visualization and a spoken audio guide for accessibility.
* **Zero-Install:** Runs entirely in the browser via a self-contained HTML interface.

---

## 🛠️ Tech Stack
* **Environment:** Google Colab (Jupyter Notebook)
* **Language:** Python 3.10+
* **AI/LLM:** Google Gemini API (via `google-generativeai`)
* **Pathfinding:** NetworkX ($A^*$ Algorithm)
* **Visualization:** Matplotlib & Base64 encoding
* **Audio:** gTTS (Google Text-to-Speech)
* **Frontend:** HTML5 + Pico.css (Embedded in Python)

---

## 🚀 How to Run
1.  Open the `SmartNav.ipynb` file in Google Colab.
2.  Add your **Gemini API Key** in the notebook secrets or code block.
3.  Run the installation cell:
    ```python
    !pip install networkx matplotlib google-generativeai gTTS
    ```
4.  Run all cells.
5.  Type your request in the prompt (e.g., *"I am at the Marshall Center and need a burger."*)
6.  The system will generate an interactive HTML dashboard below the cell.

---

## 📅 Development Roadmap (6-Hour Hackathon Plan)

### Hour 1: Foundation & Data (The "World")
* [ ] **Create Map Data:** Define Python dictionary of nodes (USF Buildings) and edges (Paths).
* [ ] **Setup Graph:** Initialize `networkx`. Add nodes and weighted edges (minutes).
* [ ] **Test Logic:** Verify `nx.shortest_path` works for basic inputs.

### Hour 2: The Brain (The LLM)
* [ ] **Setup API:** Configure Google Gemini API.
* [ ] **System Prompt:** Create prompt to convert English -> JSON (Start/End nodes).
* [ ] **Testing:** Verify vague inputs ("I need caffeine") map to concrete nodes ("Starbucks").

### Hour 3: The Visualization (The "Look")
* [ ] **Plotting:** Write `matplotlib` function to visualize the graph.
* [ ] **Styling:** Style nodes grey and the active path red.
* [ ] **Encoding:** Implement `BytesIO` logic to convert plots to Base64 strings.

### Hour 4: Integration (The "Interface")
* [ ] **Audio:** Implement `gTTS` -> Base64 conversion.
* [ ] **Frontend:** Create the HTML f-string template using Pico.css.
* [ ] **Pipeline:** Connect Input -> LLM -> NetworkX -> Plot -> HTML.

### Hour 5: Refinement
* [ ] **Persona:** Refine LLM system prompt to sound like a friendly USF student.
* [ ] **Scenarios:** Prepare 3 demo scenarios (Coffee Run, Late for Class, Food Craving).

### Hour 6: Submission
* [ ] **Documentation:** Finalize code comments.
* [ ] **Video:** Record screen capture of the agent in action.
* [ ] **Submit:** Upload to Devpost.

---

## ⚡ Helper Code: Audio to Base64
*Utility function used for generating the HTML audio player:*

```python
import base64
from io import BytesIO
from gtts import gTTS

def text_to_audio_base64(text_input):
    # Generate audio in memory
    tts = gTTS(text=text_input, lang='en', slow=False)
    fp = BytesIO()
    tts.write_to_fp(fp)
    fp.seek(0)
    
    # Encode to Base64
    return base64.b64encode(fp.read()).decode('utf-8')

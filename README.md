# **🤘 BullsPath: The AI Companion for New Students**

## **💡 The Freshman Problem**

For **Freshmen and Transfer Students**, stepping onto the massive USF campus for the first time is overwhelming. Official maps are designed for people who already know the building codes ("ENC 1002") and exact locations.

New students don't think in coordinates; they think in **needs**:

- *"Where can I find a microwave?"*
- *"I need to print something before my 10 AM class."*
- *"Where is the closest place where I can get coffee"*

There is currently no search engine at USF that bridges the gap between these vague, everyday questions and the physical campus layout.

## **🤖 The Solution**

**BullsPath** is an AI-powered navigation agent designed specifically to help newcomers feel at home instantly. Unlike static maps, it listens to natural language requests, understands context, and guides students to **resources**, not just buildings.

To ensure accessibility and rapid prototyping, we have centralized the entire application---**Backend (Python), Logic (AI), and Frontend (React/HTML)**---into a single **Google Colab** environment.

### **Key Features for Newcomers**

- **🗣️ Natural Language Search:** Type like you talk. *"I'm hungry and broke"* is a valid search query.
- **🧠 Context Aware:** Understands constraints like *"I only have 15 minutes"* or *"It needs to be indoors."*
- **🎧 Audio Guide:** Generates a friendly spoken guide, perfect for walking across campus without staring at a screen.
- **☁️ Zero-Install/Cloud Native:** The entire app lives in the cloud. No downloads required---just open the link and go.

## **🛠️ Centralized Tech Stack**

The entire project is contained within a single **Jupyter Notebook (Google Colab)**. This allows us to demo a full-stack application without complex server deployments.

- **Environment:** Google Colab (Centralized Runtime)
- **Brain (AI):** Google Gemini 2.0 Flash API (via google-generativeai)
- **Navigation Logic:** NetworkX (A* Pathfinding on a weighted graph)
- **Visualization:** Matplotlib (Dynamic map generation)
- **Voice:** gTTS (Google Text-to-Speech)
- **User Interface:** HTML5 + Tailwind CSS + Lucide Icons (Generated and served directly from Python)

## **🚀 How to Run BullsPath**

Since the entire architecture is centralized, running the app is effortless:

1. **Open the Notebook:** Load the USF_SmartNav.ipynb file in [Google Colab](https://colab.research.google.com/).
2. **Set API Key:** Add your **Gemini API Key** in the Colab secrets manager (Key name: GEMINI_API_KEY).
3. **Install Dependencies:** Run the first cell to install the lightweight requirements:
   ```
   !pip install networkx matplotlib google-generativeai gTTS
   ```
4. **Launch:** Click "Run All".
5. **Interact:** Scroll to the bottom cell. The AI Agent will process your request, calculate the path, generate the audio, and render the **Interactive HTML Interface** directly in the notebook output.

## **📅 Development Roadmap (6-Hour Hackathon)**

### **Hour 1: The World (Data & Graph)**

- [x] **Campus Mapping:** Defined 20+ key USF locations (Library, MSC, Beard Garage, etc.) in a coordinate system.
- [x] **Connectivity:** Built a weighted graph network using networkx to simulate walking paths and shortcuts.

### **Hour 2: The Brain (Gemini AI)**

- [x] **Intent Parsing:** Integrated Gemini 2.0 Flash to translate vague student queries ("I need food") into specific graph nodes.
- [x] **Reasoning Engine:** Configured the LLM to explain *why* it chose a specific destination (e.g., "The honors building is closest to you.").

### **Hour 3: The Eyes (Visualization)**

- [x] **Dynamic Mapping:** Implemented matplotlib to dynamically draw the campus graph and highlight the optimal path in Green/Gold.
- [x] **Base64 Encoding:** Created pipelines to convert generated images into web-ready formats instantly.

### **Hour 4: The Interface (UI/UX)**

- [x] **Frontend Generation:** Wrote a Python engine that generates a modern, responsive HTML/Tailwind interface.
- [x] **Audio Engine:** Implemented Text-to-Speech to provide turn-by-turn voice guidance.
- [x] **Integration:** Connected all components (AI → Graph → UI) into the single Colab workflow.

### **Hour 5: Refinement & Persona**

- [ ] **Student Persona:** Refining the system prompt to sound like a helpful upperclassman.
- [ ] **Edge Cases:** Handling "impossible" requests (e.g., "Swim to the library").

### **Hour 6: Submission Prep**

- [ ] **Documentation:** Finalizing this README.
- [ ] **Demo Video:** Recording the agent helping a "transfer student" find their first class.

## **⚡ Key Code Snippet: The Central Logic**

*This function demonstrates how we merge AI reasoning with mathematical pathfinding inside the notebook:*

```python
def get_navigation_intent(user_query):
    """
    Uses Gemini to translate 'I want coffee' into
    {'target': 'Starbucks', 'reason': 'Closest coffee shop'}
    """
    response = model.generate_content(user_query)
    intent = json.loads(response.text)
    
    # Pass intent to NetworkX for pathfinding
    path = nx.shortest_path(G, source=intent['start'], target=intent['end'])
    return path, intent['reasoning']
```

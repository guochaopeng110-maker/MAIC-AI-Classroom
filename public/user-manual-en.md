# TDuMAIC AI Interactive Classroom User Manual

Welcome to the TDuMAIC AI Interactive Classroom! This manual is specially written for teachers and non-technical users to help you get started quickly and build engaging multi-agent classrooms.

---

## 1. Introduction to AI Interactive Classroom

TDuMAIC is an open-source **AI interactive teaching platform**. You only need to type a teaching topic or upload an existing PDF presentation/document, and the system will automatically generate a complete classroom within minutes, including slides, interactive quizzes, 3D simulations, and Project-Based Learning (PBL) activities.

Once in the classroom, the AI Teacher will explain concepts using voice narration, while AI classmates will raise questions, discuss, and learn alongside you. The AI Teacher will also draw diagrams and write equations on the smart whiteboard, providing a fully immersive learning experience.

---

## 2. Preparation: Configure AI Services

Before generating classrooms, you need to configure the AI brain. Because the interactive classroom consists of text, speech, and images, different features are powered by different AI services.

### 🧩 AI Services Responsibilities & Dependencies

Before configuring, please understand the "division of labor" and dependencies:

| Service Type | Required? | Responsibility | What happens if not configured? |
| :--- | :---: | :--- | :--- |
| **Text LLM** | **Yes** | Generates outlines, writes slide content, handles agent teacher/student conversations. | ❌ The system cannot generate classrooms; clicking "Enter Classroom" will show an error. |
| **Speech (TTS)** | Optional | Gives realistic voices to the AI Teacher and classmates for voice lectures. | 🔇 Class runs in "silent mode"; agents will communicate via text bubbles only. |
| **Image Gen** | Optional | Draws relevant illustrations for slides to enrich visual appeal. | 🖼️ Slides will show placeholders or text-only layouts where images are needed. |
| **Speech Rec (ASR)** | Optional | Enables transcribing your voice using the microphone button on the homepage. | ⌨️ You can only type text via the keyboard for inputs and chatting. |
| **Video Gen** | Optional | Generates short illustrative videos for interactive demonstrations. | 🎬 Video features will be unavailable in the classroom. |

```
   ┌────────────────────────────────────────────────────────┐
   │                       Text LLM (Required Brain)        │
   └───────────┬────────────────────────┬───────────────────┘
               │ (Core Capabilities)    │ (Optional Media Enhancements)
               ▼                        ▼
     ┌──────────────────┐     ┌──────────────────┐
     │  Slides & Text   │     │   Speech (TTS)   │ ◄── Optional (Audio Class)
     │  Agent Dialogues │     │   Image Gen      │ ◄── Optional (Illustrated)
     └──────────────────┘     │   Video Gen      │ ◄── Optional (Video Demo)
                              └──────────────────┘
```

> [!IMPORTANT]
> **Text LLM is the foundation**. You must configure at least one Text LLM provider (e.g., Gemini, OpenAI, Qwen) to generate classes. Based on this, you can choose to configure Speech (TTS) or Image generation if you want an audibly and visually enriched classroom.

### Step 1: Open Settings
Click the **Gear (Settings) Icon** in the top-right corner of the main interface to open the configuration dialog.

![LLM Settings Panel](/images/llm-settings.png)

### Step 2: Retrieve and Fill in API Keys
The system supports multiple AI providers. Select the provider you wish to use and enter their API Key:
- **Google Gemini (Recommended)**: Best balance of speed and performance. `Gemini 3 Flash` is recommended.
- **OpenAI**: Supports the latest GPT model series.
- **DeepSeek / Qwen / Kimi**: Fast, cost-effective domestic AI services.
- **Local AI (Lemonade)**: If running locally, connect with one click without any API Keys.

> [!TIP]
> After pasting the API Key, click "Save" or "Confirm". When the "Enter Classroom" button at the bottom of the main interface becomes clickable, your configuration is successful!

---

## 3. Quick Start: Generate a Classroom

You can start your first class right from the input area in the center of the homepage.

### Option A: Describe the Topic with Text
Type your desired teaching topic or curriculum outline.
- **Prompting Tips**: The more specific your description, the higher the quality of the generated class.
  - *Basic*: "Teach me Quantum Physics."
  - *Better*: "Explain the basics of Quantum Physics (focusing on wave-particle duality) suitable for junior high school students. Use everyday analogies and include 3 multiple-choice questions at the end."

### Option B: Upload a PDF Document
If you have an existing slide deck or textbook chapter (PDF format), click the **"Upload PDF"** button at the bottom of the text area. The AI will analyze the document and use its content as the foundation for the generated slides and interactions.

### Assistant Tools Toggle
- **Web Search**: If your topic involves current events or cutting-edge tech, turn on **"Web Search"** at the bottom. The AI will search the web for the latest info before generating the class.
- **Interactive Mode**: Click **"Interactive Mode"**. The AI will embed 3D models, mini-games, or coding sandboxes for hands-on practice.
- **Voice Input**: If you prefer speaking, click the **microphone icon** in the bottom-right corner to speak and transcribe your voice to text.

> [!IMPORTANT]
> When ready, click the **"Enter Classroom"** button (with the arrow) on the right side. The AI will draft the outline and construct the interactive classroom.

---

## 4. Explore Interactive Classroom Modes

Once the generation is complete, you will enter the immersive classroom. OpenMAIC offers three interactive learning modes:

### Interactive Slides Mode
- **AI Teacher Lecture**: The AI Teacher automatically plays slides and explains concepts with voice narration. A **spotlight** or **laser pointer** highlights core areas.
- **Classmate Discussion**: During the lecture, AI classmates (like "Xiao Ming") will ask questions, which the AI Teacher answers in real time. You can type in the chat box to join their discussion.
- **Smart Whiteboard**: For formulas or structural drawings, the AI Teacher will write and sketch on the right-side whiteboard.

### Quiz Mode
- **Online Quiz**: Interactive multiple-choice or single-choice questions will automatically appear after key concepts are explained.
- **Instant Feedback**: The system immediately shows correct answers, and the AI Teacher explains tricky questions using voice.

### PBL & 3D Simulation Mode
- **Hands-on Experiment**: On interactive slides, you can drag sliders to adjust parameters and observe real-time reactions in 3D physics/chemistry experiments.
- **Online Coding**: Write and run simple code in a sandbox. The AI will point out syntax issues.

---

## 5. Saving, Exporting, and Sharing

You can export generated classrooms for offline use or sharing.

### Export to PPTX
Click the **"Export PPTX"** button in the top-right corner to download editable PowerPoint slides, which you can adjust in Microsoft Office or WPS.

### Export Classroom ZIP (Backup)
Click **"Export Classroom ZIP"** to download all class data (agent scripts, audio, whiteboard steps).
- **How to Import**: On the homepage, click **"Import Classroom"** next to the "Recent Classrooms" list and select your `.maic.zip` file to restore your class.

---

## 6. Frequently Asked Questions (FAQ)

### Q1: It says "Configure at least one provider" when I click "Enter Classroom"?
**Ans**: This means no API Key is configured. Click the gear icon in the top-right, enter your API Key, and save.

### Q2: The generation is stuck or taking too long. What should I do?
**Ans**: It usually takes 1 to 3 minutes. If it exceeds 5 minutes, it might be an API connection timeout. Check your network proxy settings or change LLM models in Settings.

### Q3: Can I change the AI Teacher's voice?
**Ans**: Yes! Click the "Speech Synthesis" (TTS) icon in the homepage toolbar to select a different voice or use your cloned voice.

### Q4: Can I use OpenMAIC offline?
**Ans**: Yes. If you export a "Resource Pack," it packages slides and web interactives. For local developers, configuring `Lemonade` lets you generate and run classes without an internet connection.

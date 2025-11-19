Contributing Guidelines

Thank you for your interest in contributing to Generative-AI!
This project is built for developers who want to explore real-world AI implementations through clean, well-documented, production-ready code. Your contributions help keep this repository high-quality, transparent, and educational.

⸻

🚀 How to Contribute

1. Fork the Repository

Click Fork on GitHub and clone your copy:

git clone https://github.com/<your-username>/Generative-AI.git
cd Generative-AI


⸻

2. Create a Feature Branch

git checkout -b feature/your-feature-name

Use short, descriptive names like:
	•	feature/async-agent-examples
	•	fix/rag-query-bug
	•	docs/improve-readme

⸻

🧹 Code Quality Standards

This repo maintains clean, readable, production-level code.

✔ Follow these standards:

1. You can use Javascript but Typescript will also work.

2. Follow best practices for AI development
	•	Avoid leaking API keys
	•	Use environment variables (.env files, not committed)
	•	Add input validation for LLM prompts
	•	Use structured responses when possible
	•	Avoid unnecessary API calls (optimize token usage)

3. Maintain folder structure
Each project must have:

project-name/
  ├── src/
  ├── README.md
  ├── package.json
  └── examples/ (optional)

4. Follow formatting rules
	•	Use Prettier & ESLint (repo includes config)
	•	Use meaningful variable names
	•	Add comments for complex AI workflows

⸻

📚 Documentation Requirements

Each project must include a clear README.md with:
	•	What the project does
	•	Model/LLM used
	•	How to run
	•	Example prompts
	•	Limitations
	•	Security considerations (if applicable)

⸻

🔐 Security Best Practices

Before submitting code:
	•	Never commit .env or keys
	•	Do not log sensitive data
	•	Avoid storing prompts or user input unless necessary
	•	Validate all inputs passed to LLMs
	•	Follow Responsible AI guidelines

If you discover a vulnerability, read: SECURITY.md

⸻

🛠 Submitting Your Contribution

1. Stage and commit your changes

git add .
git commit -m "feat: added new multimodal agent example"

2. Push and create a Pull Request

git push origin feature/your-feature-name

Open a PR on GitHub with:
	•	What you changed
	•	Why
	•	Instructions to test your change
	•	Any potential risks

⸻

🤝 Code of Conduct

By contributing, you agree to follow:
	•	Respectful communication
	•	High-quality, non-toxic collaboration
	•	Honest and transparent behavior

⸻

❤️ Thank You

Your contribution helps developers learn AI, build real projects, and push forward a more open and transparent AI ecosystem.
I appreciate your time and expertise!

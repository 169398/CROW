import React, { useState } from "react";
import "./App.css";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

// Initialize the OpenAI client with the API key
const openai = new OpenAI({ apiKey });

const PersonalizedLearningAssistant = () => {
  const [grades, setGrades] = useState("");
  const [learningStyles, setLearningStyles] = useState("");
  const [interests, setInterests] = useState("");
  const [personalizedLearningPlan, setPersonalizedLearningPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeStudentData = async () => {
    setIsLoading(true);

    // Create a prompt for GPT-3 to generate a personalized learning plan
    const prompt = `Student with grades: ${grades}, learning styles: ${learningStyles}, and interests: ${interests}. Generate a personalized learning plan.`;

    try {
      // Send the prompt to GPT-3
      const response = await openai.createCompletions({
        engine: "text-davinci-002", // Choose the appropriate engine
        prompt,
        max_tokens: 50, // Adjust max tokens as needed
      });

      // Extract the generated personalized learning plan from the GPT-3 response
      const generatedPlan = response.choices[0].text;

      // Update the state with the generated plan
      setPersonalizedLearningPlan([
        { resourceType: "text", resourceUrl: generatedPlan },
      ]);
    } catch (error) {
      console.error("Error generating learning plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>BRAIN </h1>
        <div className="header2">
          <h1>BOX</h1>
        </div>
      </div>
      <form>
        <input
          type="text"
          placeholder="Enter your grades. Example: A, B, C, 78, 95"
          value={grades}
          onChange={(e) => setGrades(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your learning style. Example: Visual, Auditory"
          value={learningStyles}
          onChange={(e) => setLearningStyles(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your interests. Example: Maths, Science"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />

        <button type="button" onClick={analyzeStudentData} disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Personalized Learning Plan"}
        </button>
      </form>
      <div className="learningplan">
        <h3>Personalized Learning Plan</h3>
        <ul>
          {personalizedLearningPlan.map((item, index) => (
            <li key={index}>
              <a href={item.resourceUrl}>{item.resourceType}</a>
            </li>
          ))}
        </ul>
      </div>
      {/* Heavenly bodies */}
      <div className="sun"></div>
      <div className="planet1"></div>
      <div className="planet2"></div>
      <div className="planet3"></div>
      <div className="planet4"></div>
      <div className="copyright">&copy; 2023 Idris Kulubi</div>
    </div>
  );
};

export default PersonalizedLearningAssistant;

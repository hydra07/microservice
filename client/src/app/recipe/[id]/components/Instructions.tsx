import React from 'react';
import { Step } from 'CustomTypes';

interface InstructionsProps {
  steps: Step[];
}

const Instructions: React.FC<InstructionsProps> = ({ steps }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Instructions</h2>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={step._id} className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold mb-2">Step {index + 1}</h3>
            <div className="flex flex-col gap-4">
              <p className="text-lg">{step.description}</p>
              <div className="flex flex-wrap gap-4">
                {step.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Step ${index + 1} - Image ${imgIndex + 1}`}
                    className="w-full md:w-1/4 h-48 object-cover rounded-lg shadow-md transition-transform hover:scale-105"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructions;
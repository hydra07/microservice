import React from 'react';
import { Step } from 'CustomTypes';
import { ChefHat, CookingPot } from 'lucide-react';

interface InstructionsProps {
  steps: Step[];
}

const Instructions: React.FC<InstructionsProps> = ({ steps }) => {
  return (
    <div>
      <div className='flex gap-4'>
        <ChefHat className="w-8 h-8 text-green-500" />
        <h2 className="text-2xl font-bold mb-6">Instructions</h2>
      </div>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={step._id} className="flex flex-col gap-3">

            <div className="flex flex-col gap-4">
              <div className='flex items-center gap-4'>
                <h3 className="w-6 h-6 flex items-center justify-center text-white bg-slate-400 rounded-full font-semibold">
                  {index + 1}
                </h3>
                <p className="text-lg">{step.description}</p>
              </div>

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
import { FC } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from 'next/image';
import { Step } from 'CustomTypes';

interface InstructionsListProps {
  steps: Step[];
}

const InstructionsList: FC<InstructionsListProps> = ({ steps }) => (
  <div>
    <h3 className="text-sm font-semibold mb-2">Instructions</h3>
    <ScrollArea className="h-[200px]">
      <ol className="space-y-4 text-sm">
        {steps.map((step, index) => (
          <li key={step._id} className="flex flex-col">
            <div className="flex items-center mb-2">
              <span className="mr-2 font-bold text-md">{index + 1}.</span>
              <p>{step.description}</p>
            </div>
            {step.images.length > 0 && (
              <div className="grid grid-cols-3 gap-1 mt-2">
                {step.images.map((image, imgIndex) => (
                  <Image
                    key={imgIndex}
                    src={image}
                    alt={`Step ${index + 1} Image ${imgIndex + 1}`}
                    width={150}
                    height={100}
                    className="rounded-md object-cover aspect-[3/2] shadow"
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </ScrollArea>
  </div>
);

export default InstructionsList;
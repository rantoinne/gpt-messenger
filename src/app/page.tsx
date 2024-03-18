import { Metadata } from "next";
import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: "Home",
  description: 'Home page'
}

/**
 * TODO
 * Change the text of options
 */
const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-[#FFFFFF]">
      <h1 className="text-5xl font-bold mb-20">
        ChatGPT
      </h1>

      <div className="flex flex-row justify-center items-center space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="h-6 w-6" />
            <h2>Examples</h2>
          </div>

          <div className="space-y-2">
            <p className="info-text">
              &quot;Explain something to me&quot;
            </p>
            <p className="info-text">
              &quot;What is the difference between a dog and a cat&quot;
            </p>
            <p className="info-text">
              &quot;What is the color of sun&quot;
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BoltIcon className="h-6 w-6" />
            <h2>Capabilities</h2>
          </div>

          <div className="space-y-2">
            <p className="info-text">
              &quot;Explain something to me&quot;
            </p>
            <p className="info-text">
              &quot;What is the difference between a dog and a cat&quot;
            </p>
            <p className="info-text">
              &quot;What is the color of sun&quot;
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <h2>Limitations</h2>
          </div>

          <div className="space-y-2">
            <p className="info-text">
              &quot;Explain something to me&quot;
            </p>
            <p className="info-text">
              &quot;What is the difference between a dog and a cat&quot;
            </p>
            <p className="info-text">
              &quot;What is the color of sun&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

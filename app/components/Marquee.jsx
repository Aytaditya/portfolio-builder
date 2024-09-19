import React from 'react';
import RotatedText from './RotatedText';

const testimonials = [
  { name: 'Jill', handle: '@jill', text: "I don't know what to say. I'm speechless. This is amazing." },
  { name: 'Jenny', handle: '@jenny', text: "I'm at a loss for words. This is amazing. I love it." },
  { name: 'James', handle: '@james', text: "I'm at a loss for words. This is amazing. I love it." },
  { name: 'John', handle: '@john', text: "I've never seen anything like this before. It's incredible." },
  { name: 'Jessica', handle: '@jessica', text: "This is groundbreaking. I can't believe what I'm seeing." },
];

const Marquee = () => {
  return (
    <div className='bg-[#0b0f1a]'>
        <div className='px-40 py-3'>
        <h1 className='text-4xl md:text-6xl font-bold text-center mb-6 font-enrich text-gray-100 mt-[200px]'>Hear from a few of our valued {" "}
          <RotatedText>some</RotatedText> 
          {" "} clients 🌏
        </h1>
        </div>
        <p className='text-center text-xl font-enrich text-gray-400 mb-10'>Testimonials by our clients</p>
      <div className=" p-4 overflow-hidden w-full h-[400px] flex items-center justify-center ">
      <div className="container mx-auto ">
        <div className="overflow-hidden whitespace-nowrap ">
          <div className="inline-block animate-marquee ">
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div
                key={index}
                className="inline-block bg-gray-800 rounded-lg p-6 mr-6 w-[450px] min-w-[400px] h-[200px] overflow-hidden border"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 mr-3"></div>
                  <div>
                    <div className="text-white font-bold text-lg">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.handle}</div>
                  </div>
                </div>
                <p className="text-white break-words text-base">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Marquee;
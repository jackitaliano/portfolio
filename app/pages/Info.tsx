import { Heading } from '../components/Heading';
import '../css/animations.css';

export function Info() {

  return (
    <div>
      <Heading />
      <div className='animated linear delay-1 fade-in-left'>
        <p className='my-2'>B.S. CSE</p>
      </div>
      <div className='animated linear delay-2 fade-in-left'>
        <p className='my-2'>Interned at:</p>
        <ol className='ps-8 list-disc'>
          <li>NASA</li>
          <li>State Farm</li>
          <li>Holocron Tech.</li>
        </ol>
      </div>
      <div className='mt-4 animated linear delay-3 fade-in-left'>
        <p className='my-2'>Work Experience in:</p>
        <ol className='ps-8 list-disc'>
          <li>Frontend Web</li>
          <li>Backend Web</li>
          <li>ML & LLMs</li>
        </ol>
      </div>
      <div className='mt-4 animated linear delay-4 fade-in-left'>
        <p className='my-2'>Coursework in:</p>
        <ol className='ps-8 list-disc'>
          <li>Operating Systems & Networking</li>
          <li>Database Management & Cloud</li>
          <li>Computer Vision, Neural Networks, ML</li>
          <li>Data Structures & Algorithms</li>
        </ol>
      </div>
    </div>
  )
}

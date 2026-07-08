
import React, { useState } from 'react'
import Checkbox from '../components/Checkbox';
import TriStateCheckbox from '../components/TriStateCheckbox';
import Button from '../components/Button';
import MatchComponent from '../components/Match';
import FlashcardGrid from '../components/FlashCards';
import audio from "../../public/audios/a.mp3"
import PopUp from '../components/PopUp';
import { tr } from 'framer-motion/client';
import Select from '../components/Select';
import Typography from '../components/Typography';

export default function TestPage() {
  const [checked, setChecked] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-10 flex flex-col gap-10">
        <Checkbox label="Test checkbox" checked={checked} onChange={() => setChecked(c => !c)} />
        <TriStateCheckbox label="Test tri-state checkbox" onChange={(value) => console.log(value)} />
        <Button size="sm" onClick={() => console.log('Button clicked')}>Button</Button>
        <Button size="md" onClick={() => console.log('Button clicked')}>Button</Button>
        <Button size="lg" onClick={() => console.log('Button clicked')}>Button</Button>

        <MatchComponent
          columnA={['Apple', 'Banana', 'Cherry']}
          columnB={['Red fruit', 'Yellow fruit', 'Small red fruit']}
          correctPairs={[
            { aIndex: 0, bIndex: 0 },
            { aIndex: 1, bIndex: 1 },
            { aIndex: 2, bIndex: 2 }
          ]}
          onMatchComplete={() => console.log('All matched!')}
          colorScheme="violet"
        />

<FlashcardGrid
  cards={[
    { content: '/apple.jpg', text: 'Apple', audio: '/audio/apple.mp3' },
    { content: '/banana.jpg', text: 'Banana', audio: '/audio/banana.mp3' },
    { content: '/cherry.jpg', text: 'Cherry', audio: '/audio/cherry.mp3' },
    { content: '/date.jpg', text: 'Date', audio: '/audio/date.mp3' },
  ]}
  layout="grid-4"
  learningMode={false}
  questionAudio={audio}
  questionText="Which fruit is red?"
  allowReplayQuestion={true}
  maxAttempts={3}
  cardContentType="image"
  initialFlipState="flipped"
  gridSize="lg"
/>

<Select
  label="Choose a fruit"
  options={[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ]}
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  placeholder="Select a fruit"
  colorScheme="violet"
  size="md"
  searchable={true}
/>

 <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
  <PopUp
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        colorScheme="violet"
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => console.log('Confirmed')}>Confirm</Button>
          </div>
        }
      >
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to proceed? This action cannot be undone.
        </p>
      </PopUp>



    <Typography as="h1" variant="h1" color="violet">
      Welcome Back
    </Typography>
    
    <Typography as="p" variant="large" color="secondary">
      Manage your components efficiently.
    </Typography>

    <Typography as="span" variant="caption" color="green">
      Status: Active
    </Typography>

{/* <FlashcardGrid
  cards={[
    { content: '/cat.jpg', text: 'Cat', audio: '/audio/cat.mp3' },
    { content: '/dog.jpg', text: 'Dog', audio: '/audio/dog.mp3' },
    { content: '/bird.jpg', text: 'Bird', audio: '/audio/bird.mp3' },
  ]}
  layout="learning"
  learningMode={true}
  cardContentType="image"
  initialFlipState="shown"
/>

// Text cards
<FlashcardGrid
  cards={[
    { content: 'Hello', audio: '/audio/hello.mp3' },
    { content: 'World', audio: '/audio/world.mp3' },
  ]}
  layout="grid-4"
  cardContentType="text"
  initialFlipState="flipped"
/> */}
    </div>
  )
}

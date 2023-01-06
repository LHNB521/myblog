import React from 'react';
import MarkDown from 'Src/components/MarkDown';
interface Props {
  content?: string;
}
const AboutMe: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <MarkDown content={content || ''} />
    </div>
  );
};
export default AboutMe;

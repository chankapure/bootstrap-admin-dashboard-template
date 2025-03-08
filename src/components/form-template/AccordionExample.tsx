
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const AccordionExample = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accordions</CardTitle>
        <CardDescription>
          Collapsible content sections for organizing information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. The accordion component adheres to the WAI-ARIA design pattern. 
              It uses appropriate ARIA attributes and keyboard interactions to 
              ensure accessibility for all users.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>How does it work?</AccordionTrigger>
            <AccordionContent>
              The accordion uses a combination of React state and CSS transitions 
              to animate the opening and closing of content panels. The component 
              manages focus and keyboard navigation to ensure a smooth user experience.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I customize the styling?</AccordionTrigger>
            <AccordionContent>
              Yes. The accordion component is built with Tailwind CSS, making it 
              highly customizable. You can modify the appearance by updating the 
              className properties or by adjusting the Tailwind configuration.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>Can multiple sections be open at once?</AccordionTrigger>
            <AccordionContent>
              Yes. By changing the accordion's type prop from 'single' to 'multiple', 
              you can allow users to open multiple sections simultaneously. This is 
              useful for content where users might want to compare information across 
              different sections.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger>How can I control the default open state?</AccordionTrigger>
            <AccordionContent>
              You can control the default open state by setting the 'defaultValue' 
              prop on the Accordion component. For 'single' type accordions, provide 
              a string value matching the desired AccordionItem's value. For 'multiple' 
              type accordions, provide an array of strings.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AccordionExample;

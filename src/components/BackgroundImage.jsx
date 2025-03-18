import React from 'react';

const BackgroundImage = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100" />
      

      <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat" />

      <div className="absolute inset-0 bg-repeat opacity-5" 
        style={{ 
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAD8/vz08vT09vT8+vzs7uxH16TeAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAuFJREFUOI0Vk+3NLiEIRG1B8ClAYAsENt9/60YZ93/IHwRCYeZwGaC0eekfgQFBuZhAB8wvj5mIU9e+q7/jYPHe2KqNQOSD+6qFQQc6rXzxXPBAm58dGBR0oEtHHKEsMRw5KThwxK7FGW52RwMIShhIlSc8EHsEqHKQqnKREsFhFSOd0JQKnEIYgTgVDkw+tANyeiTErgwE/I+LmyM+wGEBQaCHCxF1qSAjCARWAHlZfEhiCLUkBEl4xEnxQYESgILF+WhBQy4LQwy3lw0PEQk9ZEDCPBgK8xwnX2BRA0EGlG4xFAKyIYtBABnYEiBpVbhK6mV8MNAWk1EMSBAF0OVFiBKkqf7QgoGmQgvkUFPBvkJ5vurUGpKE+czve4r1QA1UBmTXJxwVlAp+HeB1hZnA+4q3rj2QJ+7qdQMGiwO8Z3xm6oWzIQB3dgwEu0bBJBgMYgCO1Zh7dG0LQLNHiWQA5EQERw7e0GqHPAEBgZa0/QNSOz16pWBA8tARBg3nWqKYGwGn9qbRpE41B2QDmYBhfwqOlQB5gMc0GUiVgLIEtrYN8qo9qKwGvMVmPEtNMQMZwV4VoYiVgDGrdI7RWAkRKx1gEmhK0xJRki9GEaQi8kG0xOAQGkK8WhTx1BWQFYR0khgwekkgp6CpvVQJiUeCz//YvrE6GJAkAhkn2ThBJEWQSxDpK7YnYHcE8go9pH+BBZ+Y3PvtP7UWcLQH0K+zvQZWE0Ch0NA3EBwYJ+MhpZrx8ISxAJ7Px0GaKp+LSgLIHHXJwX60ZoUSpEoReak8CMjqG6nyIE4Fl4uVEqR+x//q+r4+AkYILAVJpwZkVbYvaqBoSnx4AHlQVhmEtlJWFP38HxjYfvcvKbOHc5OE//8TwMt8GPj0xwN5r4w0T0WdOXw/T4iO2v8wEgGXxwEY4mOX6Y3H4tn/3c8/2UaF4eXqFtoAAAAASUVORK5CYII=")` 
        }} 
      />
    </div>
  );
};

export default BackgroundImage;

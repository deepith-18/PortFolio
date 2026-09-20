// src/components/Background.js (NEW GALAXY VERSION)
import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
// You need to load the full engine now for custom configurations
import { loadFull } from 'tsparticles'; 

const Background = () => {
  // This function loads the full tsparticles engine
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // This is where we define the galaxy/starfield configuration
  const particleOptions = {
    background: {
      color: {
        value: 'transparent', // This allows your CSS gradient to show through
      },
    },
    fullScreen: {
        enable: true,
        zIndex: -1 // This is crucial, it places the particles behind all other content
    },
    particles: {
      number: {
        value: 200, // More particles for a denser starfield
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ['#ffffff', '#6ea8ff', '#5eead4', '#a5b4fc'], // Bright galaxy stars (white, blue, mint, indigo)
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: { min: 0.1, max: 0.8 }, // Creates a twinkling effect
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: { min: 0.5, max: 2.5 }, // Creates depth with stars of different sizes
      },
      move: {
        enable: true,
        speed: 0.5, // Slow, gentle drift
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'out',
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'bubble', // Makes stars around the cursor grow, like a gravitational effect
        },
      },
      modes: {
        bubble: {
          distance: 200,
          duration: 2,
          opacity: 1,
          size: 4,
        },
      },
    },
    detectRetina: true, // Ensures it looks sharp on high-resolution screens
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particleOptions}
    />
  );
};

export default Background;




// // src/components/Background.js (NEW 3D TIMELINE VERSION)
// import React, { useCallback } from 'react';
// import Particles from 'react-tsparticles';
// import { loadFull } from 'tsparticles'; 

// const Background = () => {
//   const particlesInit = useCallback(async (engine) => {
//     await loadFull(engine);
//   }, []);

//   const particleOptions = {
//     background: {
//       color: {
//         value: 'transparent', // Keep the background transparent
//       },
//     },
//     fullScreen: {
//         enable: true,
//         zIndex: -1 // Keep it behind all other content
//     },
//     // Base particle settings for all icons
//     particles: {
//       number: {
//         value: 30, // A lower number so it's not too cluttered
//         density: {
//           enable: true,
//           area: 800,
//         },
//       },
//       links: {
//         enable: false, // We don't want lines connecting the icons
//       },
//       move: {
//         enable: true,
//         speed: 1, // Slow, gentle floating motion
//         direction: 'none',
//         random: true,
//         straight: false,
//         outModes: {
//           default: 'out',
//         },
//       },
//       size: {
//         value: { min: 15, max: 30 }, // Icons are large enough to be visible
//       },
//       opacity: {
//         value: { min: 0.3, max: 0.8 }, // Fades in and out for a subtle effect
//       },
//       // This is the key for the 3D effect
//       rotate: {
//         random: {
//           enable: true,
//           minimumValue: 0,
//         },
//         value: 0,
//         animation: {
//           enable: true,
//           speed: 5, // How fast they rotate
//           sync: false,
//         },
//         direction: 'random',
//       },
//     },
//     // Define the different milestone groups
//     groups: {
//       education: {
//         number: {
//           value: 8, // 8 book icons
//         },
//         shape: {
//           type: 'char',
//           options: {
//             char: {
//               value: ['📘'], // The book emoji
//               font: 'Verdana',
//               style: '',
//               weight: '400',
//               fill: true,
//             },
//           },
//         },
//         color: {
//           value: '#3b82f6', // A nice blue color for education
//         },
//       },
//       projects: {
//         number: {
//           value: 12, // 12 gear icons
//         },
//         shape: {
//           type: 'char',
//           options: {
//             char: {
//               value: ['⚙️'], // The gear emoji
//               font: 'Verdana',
//               style: '',
//               weight: '400',
//               fill: true,
//             },
//           },
//         },
//         color: {
//           value: '#ffffff', // White/silver for projects
//         },
//       },
//       achievements: {
//         number: {
//           value: 6, // 6 trophy icons
//         },
//         shape: {
//           type: 'char',
//           options: {
//             char: {
//               value: ['🏆'], // The trophy emoji
//               font: 'Verdana',
//               style: '',
//               weight: '400',
//               fill: true,
//             },
//           },
//         },
//         color: {
//           value: '#facc15', // A gold color for achievements
//         },
//       },
//     },
//     // Interactivity settings to highlight icons on hover
//     interactivity: {
//       events: {
//         onHover: {
//           enable: true,
//           mode: 'bubble', // This will make the icon grow
//         },
//       },
//       modes: {
//         bubble: {
//           distance: 100,
//           duration: 2,
//           opacity: 1, // Make it fully visible on hover
//           size: 40, // Make it grow larger to highlight it
//         },
//       },
//     },
//     detectRetina: true,
//   };

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={particleOptions}
//     />
//   );
// };

// export default Background;




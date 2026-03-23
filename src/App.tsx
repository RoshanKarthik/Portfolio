// Needed for GlitchLoader at the bottom
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, animate } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Menu, X, ArrowRight, Github, Linkedin, Twitter, Mail, ExternalLink, Code2, Cpu, Globe, Rocket, Terminal, Zap, Download, Award, CheckCircle2, Send, Eye } from 'lucide-react';
import { 
  SiReact, 
  SiTailwindcss, 
  SiJavascript, 
  SiHtml5, 
  SiCss, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiCplusplus, 
  SiGit, 
  SiGithub, 
  SiOpenai,
  SiPostman,
  SiPython,
  SiC,
  SiMysql,
  SiScikitlearn,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiOpencv,
  SiHuggingface,
  SiJupyter,
  SiGooglecolab,
  SiDocker,
  SiFastapi,
  SiLeetcode,
  SiGeeksforgeeks
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { cn } from './lib/utils';
import AI from "./assests/AI.png";
import Cloud from "./assests/Cloud.png";
import dataPlatform from "./assests/dataPlatform.png";
import DSA from "./assests/DSA.png";
import ML from "./assests/ML.png";
import NLP from "./assests/NLP.png";
import robotics from "./assests/robotics.png";
import HP from "./assests/HP.png";
import CD from "./assests/CD.jpg";

import Typewriter from "typewriter-effect";
// --- Animation Components ---

const TextReveal = ({ text, className = "" }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={cn("flex flex-wrap justify-center gap-x-[0.2em]", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block overflow-hidden"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0.1
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-64 h-64 rounded-full bg-accent-purple/5 blur-[100px]"
        />
      ))}
    </div>
  );
};

// --- Cursor Lightning Effect ---

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent-purple z-[100] origin-left shadow-[0_0_15px_rgba(124,58,237,0.8)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

const CursorGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [flicker, setFlicker] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const flickerInterval = setInterval(() => {
      setFlicker(Math.random() > 0.9 ? 1.2 : 1);
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(flickerInterval);
    };
  }, []);

  return (
    <>
      {/* Main Glow */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[9999] blur-[100px] opacity-40 mix-blend-screen"
        animate={{
          x: mousePos.x - 200,
          y: mousePos.y - 200,
          scale: flicker,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
        }}
      />
      
      {/* Lightning Core */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[10000] blur-sm bg-white"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ 
          x: { type: 'spring', damping: 20, stiffness: 300 },
          y: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { duration: 0.1, repeat: Infinity },
          opacity: { duration: 0.1, repeat: Infinity }
        }}
        style={{
          boxShadow: '0 0 20px 5px rgba(124,58,237,0.8), 0 0 40px 10px rgba(255,255,255,0.5)',
        }}
      />

      {/* Lightning Sparks */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-1 h-8 bg-accent-purple rounded-full pointer-events-none z-[9999] blur-[1px]"
          animate={{
            x: mousePos.x + (Math.random() - 0.5) * 100,
            y: mousePos.y + (Math.random() - 0.5) * 100,
            rotate: Math.random() * 360,
            opacity: [0, 1, 0],
            scaleY: [0, 1.5, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: Math.random() * 0.5,
          }}
        />
      ))}
    </>
  );
};

// --- Animated Stars Background ---

const Stars = () => {
  const stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}
    </div>
  );
};

// --- Galaxy Effect ---

const GalaxyBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main galaxy core */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: `conic-gradient(
            from 0deg,
            rgba(124, 58, 237, 0.4),
            rgba(99, 102, 241, 0.3),
            rgba(34, 211, 238, 0.2),
            rgba(124, 58, 237, 0.4)
          )`,
          filter: 'blur(40px)',
        }}
      />

      {/* Secondary galaxy */}
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: `conic-gradient(
            from 0deg,
            rgba(34, 211, 238, 0.3),
            rgba(124, 58, 237, 0.2),
            rgba(99, 102, 241, 0.3),
            rgba(34, 211, 238, 0.3)
          )`,
          filter: 'blur(50px)',
        }}
      />

      {/* Accent nebula */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 right-1/3 w-[500px] h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent)`,
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
};

// --- Optimus Prime Transformer Robot Component ---

const Robot = ({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) => {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightShoulder = useRef<THREE.Mesh>(null);
  const leftShoulder = useRef<THREE.Mesh>(null);
  const chestCore = useRef<THREE.Mesh>(null);

  // Scratch variables for smooth rotation and performance
  const targetHeadRotation = useRef(new THREE.Quaternion());
  const targetBodyRotation = useRef(new THREE.Quaternion());
  const scratchEuler = useRef(new THREE.Euler());

  useFrame((state, delta) => {
    if (!group.current || !head.current || !body.current) return;

    const t = state.clock.getElapsedTime();

    // 1. Calculate Target Rotations based on mouse
    const yaw = mouse.current[0] * Math.PI;
    const pitch = -mouse.current[1] * (Math.PI / 3);
    const roll = mouse.current[0] * 0.15;

    // 2. Head Rotation (Slerp for smooth mouse following)
    scratchEuler.current.set(pitch, yaw, roll);
    targetHeadRotation.current.setFromEuler(scratchEuler.current);
    
    const headAlpha = 1 - Math.exp(-8 * delta);
    head.current.quaternion.slerp(targetHeadRotation.current, headAlpha);

    // 3. Body Rotation (Follows head with lag)
    const bodyYaw = mouse.current[0] * (Math.PI / 6);
    const bodyPitch = -mouse.current[1] * 0.1;
    
    scratchEuler.current.set(bodyPitch, bodyYaw, 0);
    targetBodyRotation.current.setFromEuler(scratchEuler.current);
    
    const bodyAlpha = 1 - Math.exp(-4 * delta);
    body.current.quaternion.slerp(targetBodyRotation.current, bodyAlpha);

    // 4. Floating/Hovering Motion
    group.current.position.y = Math.sin(t * 1.5) * 0.3;
    group.current.rotation.z = Math.sin(t * 0.8) * 0.04;
    
    // 5. Arm Animations - sword-like arm swings
    if (rightArm.current && leftArm.current) {
      rightArm.current.rotation.z = Math.sin(t * 1.8) * 0.12 - 0.3;
      leftArm.current.rotation.z = -Math.sin(t * 1.8) * 0.12 + 0.3;
      
      const armTargetX = mouse.current[1] * 0.6;
      const armAlpha = 1 - Math.exp(-5 * delta);
      rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, armTargetX, armAlpha);
      leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, armTargetX, armAlpha);
    }

    // 6. Shoulder animations
    if (rightShoulder.current && leftShoulder.current) {
      const shoulderScale = 1 + Math.sin(t * 2) * 0.08;
      rightShoulder.current.scale.set(shoulderScale, 1, 1);
      leftShoulder.current.scale.set(shoulderScale, 1, 1);
    }

    // 7. Chest core pulsing (Matrix of Leadership glow)
    if (chestCore.current) {
      const pulse = 1 + Math.sin(t * 3) * 0.15;
      chestCore.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={group}>
      {/* HEAD - Optimus Prime Head Design */}
      <group ref={head} position={[0, 1.2, 0]}>
        {/* Main Head - Boxy with faceplate */}
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.9, 0.7]} />
          <meshStandardMaterial color="#CC0000" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Head Crest/Helmet Ridge - Blue */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.75, 0.25, 0.35]} />
          <meshStandardMaterial color="#0047AB" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Faceplate - Blue */}
        <mesh position={[0, -0.05, 0.36]}>
          <boxGeometry args={[0.6, 0.5, 0.1]} />
          <meshStandardMaterial color="#0047AB" metalness={1} roughness={0.1} />
        </mesh>

        {/* Eyes - Bright Red Glow */}
        <group position={[0, 0.1, 0.38]}>
          <mesh position={[-0.15, 0.05, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#FF4500" />
            <pointLight intensity={4} distance={2} color="#FF4500" />
          </mesh>
          <mesh position={[0.15, 0.05, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#FF4500" />
            <pointLight intensity={4} distance={2} color="#FF4500" />
          </mesh>
        </group>

        {/* Mouth Area - Details */}
        <mesh position={[0, -0.15, 0.36]}>
          <boxGeometry args={[0.5, 0.15, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} />
        </mesh>
      </group>

      {/* BODY - Optimus Prime Torso */}
      <group ref={body}>
        {/* Neck Joint */}
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.3, 32]} />
          <meshStandardMaterial color="#0047AB" metalness={0.9} />
        </mesh>

        {/* Upper Torso - Red */}
        <mesh castShadow position={[0, 0.1, 0]}>
          <boxGeometry args={[1.2, 0.8, 0.6]} />
          <meshStandardMaterial color="#CC0000" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Chest Armor Plate - Blue */}
        <mesh position={[0, 0.15, 0.31]} castShadow>
          <boxGeometry args={[1.05, 0.7, 0.15]} />
          <meshStandardMaterial color="#0047AB" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Matrix of Leadership Core - Glowing Center */}
        <group position={[0, 0.15, 0.37]}>
          <mesh ref={chestCore}>
            <cylinderGeometry args={[0.25, 0.25, 0.05, 32]} />
            <meshBasicMaterial color="#FFD700" />
            <pointLight intensity={5} distance={3} color="#FFD700" />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
            <meshBasicMaterial color="#FFA500" transparent opacity={0.6} />
          </mesh>
        </group>

        {/* Lower Torso - Red */}
        <mesh castShadow position={[0, -0.5, 0]}>
          <boxGeometry args={[1.1, 0.7, 0.6]} />
          <meshStandardMaterial color="#CC0000" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Hip/Waist Detail - Blue */}
        <mesh position={[0, -0.15, -0.31]}>
          <boxGeometry args={[1.0, 0.2, 0.1]} />
          <meshStandardMaterial color="#0047AB" metalness={0.9} />
        </mesh>

        {/* Shoulder Joints - Large Blue Plates */}
        <mesh ref={rightShoulder} position={[0.7, 0.3, 0]} castShadow>
          <boxGeometry args={[0.35, 0.6, 0.45]} />
          <meshStandardMaterial color="#0047AB" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh ref={leftShoulder} position={[-0.7, 0.3, 0]} castShadow>
          <boxGeometry args={[0.35, 0.6, 0.45]} />
          <meshStandardMaterial color="#0047AB" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* ARMS - Red with Blue accents */}
        <group ref={rightArm} position={[0.75, 0.3, 0]}>
          {/* Upper Arm */}
          <mesh position={[0, -0.35, 0]} castShadow>
            <boxGeometry args={[0.35, 0.85, 0.35]} />
            <meshStandardMaterial color="#CC0000" metalness={0.85} roughness={0.25} />
          </mesh>
          
          {/* Elbow Joint */}
          <mesh position={[0, -0.75, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#0047AB" metalness={0.95} />
          </mesh>
          
          {/* Forearm and Hand */}
          <mesh position={[0, -1.15, 0]} castShadow>
            <boxGeometry args={[0.32, 0.7, 0.32]} />
            <meshStandardMaterial color="#CC0000" metalness={0.85} roughness={0.25} />
          </mesh>

          {/* Weapon/Hand Blue Section */}
          <mesh position={[0, -1.65, 0]}>
            <boxGeometry args={[0.3, 0.25, 0.3]} />
            <meshStandardMaterial color="#0047AB" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>

        <group ref={leftArm} position={[-0.75, 0.3, 0]}>
          {/* Upper Arm */}
          <mesh position={[0, -0.35, 0]} castShadow>
            <boxGeometry args={[0.35, 0.85, 0.35]} />
            <meshStandardMaterial color="#CC0000" metalness={0.85} roughness={0.25} />
          </mesh>
          
          {/* Elbow Joint */}
          <mesh position={[0, -0.75, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#0047AB" metalness={0.95} />
          </mesh>
          
          {/* Forearm and Hand */}
          <mesh position={[0, -1.15, 0]} castShadow>
            <boxGeometry args={[0.32, 0.7, 0.32]} />
            <meshStandardMaterial color="#CC0000" metalness={0.85} roughness={0.25} />
          </mesh>

          {/* Weapon/Hand Blue Section */}
          <mesh position={[0, -1.65, 0]}>
            <boxGeometry args={[0.3, 0.25, 0.3]} />
            <meshStandardMaterial color="#0047AB" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      </group>

      {/* Hover Base - Energy Platform */}
      <group position={[0, -2.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[1.8, 1.8, 0.15, 64]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.1} />
        </mesh>
        
        {/* Energy Rings - Orange/Blue */}
        <mesh position={[0, 0.08, 0]}>
          <ringGeometry args={[1.5, 1.65, 64]} />
          <meshBasicMaterial color="#FF8C00" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <ringGeometry args={[1.2, 1.35, 64]} />
          <meshBasicMaterial color="#0047AB" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <ringGeometry args={[0.8, 0.95, 64]} />
          <meshBasicMaterial color="#FFD700" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
};

const Scene = ({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7C3AED" />
      
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <Robot mouse={mouse} />
      </Float>

      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={12} blur={2.5} far={4.5} />
      <Environment preset="night" />
    </>
  );
};

// --- UI Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'ACHIEVEMENTS', href: '#achievements' },
    { name: 'EDUCATION', href: '#experience' },
    { name: 'CERTIFICATIONS', href: '#certification' },
    { name: 'CONTACT', href: '#contact' }
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-6 flex items-center justify-between",
      isScrolled ? "bg-primary/80 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent"
    )}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-display font-black tracking-tighter text-white"
      >
        ROSHAN<span className="text-accent-purple">.</span>
      </motion.div>

      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((item, i) => (
          <motion.a 
            key={item.name} 
            href={item.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
          >
            {item.name}
          </motion.a>
        ))}
        {/* <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold tracking-widest hover:bg-white/10 transition-all"
        >
          HIRE ME
        </motion.button> */}
      </div>

      <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-secondary border-b border-white/5 p-8 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-sm font-bold tracking-widest text-zinc-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

const Hero = () => {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden pt-20">
      
      {/* Background Effects */}
      <GalaxyBackground />
      <Stars />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute inset-0 noise-bg" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 items-center h-full relative z-10">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-start"
        >

          {/* 🔥 Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-1.5 rounded-full border border-accent-purple/30 bg-accent-purple/5 text-[10px] font-black tracking-[0.3em] text-accent-purple mb-6"
          >
            MACHINE LEARNING ENGINEER
          </motion.div>

          {/* 🔥 Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-6"
          >
            ROSHAN <br />
            <span className="text-zinc-700">KARTHIK</span>
          </motion.h1>

          {/* ⚡ Typing Effect */}
          <div className="text-accent-purple text-sm font-bold tracking-widest mb-4">
            <Typewriter
              options={{
                strings: [
                  "Building AI-Powered Solutions",
                  "Developing Machine Learning Models",
                  "Solving Complex Data Problems"
                ],
                autoStart: true,
                loop: true,
                cursor: '_',
                delay: 50,
                deleteSpeed: 30
              }}
            />
          </div>

          {/* 🧠 Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-zinc-400 text-lg max-w-md mb-6 leading-relaxed font-medium"
          >
            AI & Machine Learning Enthusiast | Building intelligent, scalable solutions with modern technologies
            Passionate about artificial intelligence and deep learning, focused on solving real-world problems through data-driven approaches
          </motion.p>

          {/* 💎 One-liner */}
          <p className="text-white text-sm font-semibold italic mb-10">
            "Turning data into insights, code into solutions."
          </p>

          {/* 🔗 Buttons */}
          <div className="flex flex-wrap gap-5">
            <a 
              href="/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl btn-gradient text-white font-bold text-sm tracking-widest flex items-center gap-3 group"
            >
              VIEW CV
              <Eye className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
            <a 
              href="/CV.pdf"
              download="RoshanCV.pdf"
              className="px-8 py-4 rounded-xl btn-gradient text-white font-bold text-sm tracking-widest flex items-center gap-3 group"
            >
              DOWNLOAD CV
              <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>

            <div className="flex gap-4">
              <a href="https://github.com/RoshanKarthik" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl border border-black/10 flex items-center justify-center hover:bg-black/5 transition-all">
                <Github className="w-5 h-5 text-zinc-400" />
              </a>
              <a href="https://www.linkedin.com/in/roshan-karthik/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl border border-black/10 flex items-center justify-center hover:bg-black/5 transition-all">
                <Linkedin className="w-5 h-5 text-zinc-400" />
              </a>
              <a href="mailto:roshankarrthik@gmail.com" className="w-12 h-12 rounded-xl border border-black/10 flex items-center justify-center hover:bg-black/5 transition-all">
                <Mail className="w-5 h-5 text-zinc-400" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE (3D unchanged) */}
        <div className="relative h-[500px] lg:h-full w-full flex items-center justify-center">
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
              transition={{ duration: 2 }}
              className="text-[22vw] font-black tracking-tighter absolute text-black/5 uppercase"
            >
              WELCOME
            </motion.div>
          </div>

          <div className="w-full h-full relative z-10">
            <Canvas shadows dpr={[1, 2]}>
              <Suspense fallback={null}>
                <Scene mouse={mouse} />
              </Suspense>
            </Canvas>
          </div>

        </div>
      </div>
    </section>
  );
};

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="about"
      className="py-32 relative overflow-hidden"
      ref={ref}
    >
      <GalaxyBackground />
      <Stars />
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            
            {/* 🔥 Heading */}
            <h2 className="text-4xl md:text-7xl font-display font-black mb-10 leading-tight">
              ABOUT <span className="text-accent-purple">ME</span>
            </h2>

            {/* ✨ Paragraph 1 */}
            <p className="text-zinc-400 text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
              I am an aspiring AI and machine learning enthusiast with a strong interest in deep learning and intelligent systems. My interest in AI comes from a passion for solving complex real-world problems through data-driven approaches and intelligent systems.</p>

            {/* ✨ Paragraph 2 */}
            <p className="text-zinc-400 text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
              I aim to continuously grow in the field of AI while contributing to impactful and meaningful technological advancements.
            </p>

            {/* 💎 One-liner */}
            <p className="text-white text-lg font-semibold italic">
              "Data-driven decisions. AI-powered innovations."
            </p>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "CAR DAMAGE DETECTION MODEL",
      subtitle: "AI-powered vehicle damage assessment system",
      problem:
        "Manual vehicle damage assessment is time-consuming and subjective, leading to inconsistent evaluations.",
      solution:
        "Developed an end-to-end car damage detection system using PyTorch CNN models, achieving 92% accuracy with optimized preprocessing.",
      tech: "Python • PyTorch • FastAPI • Streamlit • TorchVision • Pillow",
      impact:
        "Reduced image loading latency by 35% and improved user interaction efficiency by 50% with real-time damage predictions.",
      link: "https://github.com/RoshanKarthik/Car-Damage-Detection-Model",
      img: CD
    },
    {
      title: "HOUSE PRICE PREDICTION MODEL",
      subtitle: "Machine learning-based property valuation",
      problem:
        "Traditional property valuation methods lack data-driven accuracy and real-time assessment capabilities.",
      solution:
        "Architected a housing price prediction pipeline using scikit-learn, handling datasets from $85K to $2.35M with RMSE/MAE metrics.",
      tech: "Python • Pandas • NumPy • Scikit-Learn • Matplotlib • Seaborn",
      impact:
        "Delivered accurate property price estimates through an interactive web interface, supporting data-driven real estate decisions.",
      link: "https://github.com/RoshanKarthik/Property_Price-Prediction-Model",
      img: HP
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden text-white selection:bg-accent-purple/30" id="projects">
      {/* Background Effects */}
      <GalaxyBackground />
      <Stars />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute inset-0 noise-bg" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center py-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="px-4 py-1.5 rounded-full border border-accent-purple/30 bg-accent-purple/5 text-[10px] font-black tracking-[0.3em] text-accent-purple mb-4 uppercase shadow-[0_0_15px_rgba(124,58,237,0.2)] cursor-default">SELECTED WORK</div>
          <h2 className="text-4xl md:text-7xl font-black">
            PROJECTS THAT <br />
            <span className="text-accent-purple">CREATE IMPACT</span>
          </h2>
        </motion.div>
      </div>

      {/* PROJECTS */}
      <div className="container mx-auto px-6 md:px-12 grid gap-24 z-10">
        {projects.map((p, i) => (
          <div
            key={i}
            className="grid lg:grid-cols-2 items-center gap-12 glass rounded-3xl p-8 md:p-12 backdrop-blur-xl border border-white/10"
          >
            {/* LEFT — TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <h3 className="text-3xl md:text-5xl font-black">
                {p.title}
              </h3>
              <p className="text-accent-purple font-semibold">
                {p.subtitle}
              </p>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p><span className="text-white font-semibold">Problem:</span> {p.problem}</p>
                <p><span className="text-white font-semibold">Solution:</span> {p.solution}</p>
                <p><span className="text-white font-semibold">Tech:</span> {p.tech}</p>
                <p><span className="text-white font-semibold">Impact:</span> {p.impact}</p>
              </div>
              <a
                href={p.link}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-accent-purple hover:gap-4 transition-all"
              >
                VIEW PROJECT →
              </a>
            </motion.div>
            {/* RIGHT — IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* FINAL CTA */}
      <div className="w-full flex items-center justify-center text-center py-24 z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold"
        >
          MORE PROJECTS ON <br />
          <span className="text-accent-purple">GITHUB</span>
        </motion.h2>
      </div>
    </section>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const skillGroups = [
    {
      title: 'LANGUAGES',
      skills: [
        { name: 'Python', icon: SiPython, color: '#3776AB' },
        { name: 'C++', icon: SiCplusplus, color: '#00599C' },
        { name: 'C', icon: SiC, color: '#A8B9CC' },
        { name: 'Java', icon: FaJava, color: '#007396' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'SQL', icon: SiMysql, color: '#4479A1' }
      ]
    },
    {
      title: 'AI & ML LIBRARIES',
      skills: [
        { name: 'Scikit-Learn', icon: SiScikitlearn, color: '#F7931E' },
        { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
        { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
        { name: 'Keras', icon: SiKeras, color: '#D00000' },
        { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8' },
        { name: 'Torchvision', icon: SiPytorch, color: '#EE4C2C' },
        { name: 'Hugging Face Transformers', icon: SiHuggingface, color: '#FFD21E' }
      ]
    },
    {
      title: 'TOOLS & PLATFORMS',
      skills: [
        { name: 'Jupyter Notebook', icon: SiJupyter, color: '#F37626' },
        { name: 'Google Colab', icon: SiGooglecolab, color: '#F9AB00' },
        { name: 'Git', icon: SiGit, color: '#F05032' },
        { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
        { name: 'Docker', icon: SiDocker, color: '#2496ED' },
        { name: 'FastAPI', icon: SiFastapi, color: '#009688' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-32 relative overflow-hidden" ref={ref}>
      <GalaxyBackground />
      <Stars />
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-[10px] font-black tracking-[0.3em] text-accent-purple mb-4 uppercase">Tech Stack</div>
          <TextReveal text="SKILLS." className="text-4xl md:text-6xl font-display font-black" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="glass p-8 rounded-[32px] border-black/5 hover:border-accent-purple/20 transition-all group/card"
            >
              <h3 className="text-xs font-black tracking-[0.2em] text-accent-purple mb-8 border-b border-white/5 pb-4 group-hover/card:text-white transition-colors">{group.title}</h3>
              <div className="space-y-6">
                {group.skills.map((skill, j) => (
                  <motion.div 
                    key={skill.name} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) + (j * 0.05) }}
                    className="flex items-center gap-4 group cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center group-hover:bg-accent-purple/20 transition-all group-hover:scale-110 group-hover:rotate-6">
                      <skill.icon 
                        className="w-5 h-5 transition-all" 
                        style={{ color: skill.color }}
                      />
                    </div>
                    <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Achievements = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const achievements = [
    { label: 'LEETCODE', value: 'VIEW PROFILE', icon: SiLeetcode, url: 'https://leetcode.com/u/Roshan_karthik/', extra: 'heatmap' },
    { label: 'GEEKS FOR GEEKS', value: 'VIEW PROFILE', icon: SiGeeksforgeeks, url: 'https://www.geeksforgeeks.org/profile/roshankarthik160705', extra: 'rank' }
  ];

  return (
    <section id="achievements" className="py-32 relative overflow-hidden">
      <GalaxyBackground />
      <Stars />
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* <div className="text-[10px] font-black tracking-[0.3em] text-accent-purple mb-4 uppercase">Competitive Programming</div> */}
          <TextReveal text="ACHIEVEMENTS." className="text-4xl md:text-6xl font-display font-black" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => window.open(achievement.url, '_blank')}
                className="glass p-10 rounded-[40px] border-white/5 text-center group hover:border-accent-purple/30 transition-all relative overflow-hidden cursor-pointer w-full"
              >
                <div className="absolute inset-0 bg-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-8 group-hover:bg-accent-purple/20 transition-all group-hover:rotate-12 relative z-10"
                >
                  <achievement.icon className="w-8 h-8 text-zinc-500 group-hover:text-accent-purple transition-colors" />
                </motion.div>
                
                <div className="text-5xl font-display font-black text-white mb-3 relative z-10 min-h-[70px] flex items-center justify-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    className="flex items-baseline gap-1"
                  >
                    {achievement.prefix && <span className="text-lg font-bold text-zinc-500">{achievement.prefix}</span>}
                    {achievement.value}
                  </motion.div>
                </div>
                <div className="text-xs font-black tracking-[0.2em] text-zinc-500 uppercase relative z-10">{achievement.label}</div>

              {achievement.extra === 'heatmap' && (
                <div className="mt-6 w-full max-w-md mx-auto">
                  <img 
                    src="https://leetcard.vercel.app/Roshan_karthik?theme=dark&ext=heatmap" 
                    alt="LeetCode Contribution Heatmap" 
                    className="w-full rounded-lg border border-white/10"
                  />
                </div>
              )}

              {achievement.extra === 'rank' && (
                <div className="mt-6 text-center">
                  <p className="text-sm font-medium text-zinc-400">Achieved #204 University Rank</p>
                </div>
              )}
            </motion.div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Training = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="training" className="py-32 bg-transparent relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-full bg-accent-purple/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[60px] border-white/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/10 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent-purple/20 transition-colors duration-1000" />
          
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[10px] font-black tracking-[0.3em] text-accent-purple mb-6 uppercase"
            >
              Professional Training
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-10 leading-tight">
              MASTERING DATA STRUCTURES <br/>
              AND <span className="text-accent-purple relative">
                ALGORITHMS
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1.5 bg-accent-purple/30 rounded-full"
                />
              </span>.
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  Completed intensive training at AlgoTutor, focusing on algorithmic thinking and problem-solving 
                  with data structures including arrays, linked lists, stacks, queues, trees, graphs, and hashing.
                </p>
                <ul className="space-y-4">
                  {[
                    'Strengthened Algorithmic Thinking',
                    'Efficient C++ Implementations',
                    'Competitive Programming Proficiency',
                    'Problem-Solving Enhancement'
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-4 text-sm font-bold text-zinc-300 group/item"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-purple group-hover/item:scale-150 transition-transform" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20, rotate: 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                whileHover={{ scale: 1.02, rotate: -1 }}
                className="glass p-10 rounded-[40px] border-white/10 bg-white/5 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="text-[10px] font-black tracking-widest text-accent-purple mb-6 uppercase">Skills Mastered</div>
                <div className="flex flex-wrap gap-3">
                  {['Data Structures', 'Algorithms', 'C++ Programming', 'Problem Solving', 'Competitive Coding', 'Time Complexity'].map((tech, i) => (
                    <motion.span 
                      key={tech} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.05 }}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.3)' }}
                      className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-zinc-400 transition-all cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Timeline = ({ items, type = 'education' }: { items: any[], type?: 'education' | 'certification' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleX = useTransform(scrollXProgress, [0, 1], [0, 1]);

  return (
    <div className="relative w-full overflow-x-auto lg:overflow-visible pb-20 pt-20 no-scrollbar snap-x snap-mandatory">
      {/* Horizontal Line (Desktop) */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0">
        <motion.div 
          className="h-full bg-linear-to-r from-accent-purple via-blue-500 to-accent-purple shadow-[0_0_15px_rgba(124,58,237,0.5)]"
          style={{ scaleX, originX: 0 }}
        />
      </div>

      {/* Vertical Line (Mobile) */}
      <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-white/10 z-0">
        <motion.div 
          className="w-full bg-linear-to-b from-accent-purple via-blue-500 to-accent-purple shadow-[0_0_15px_rgba(124,58,237,0.5)]"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      </div>

      <div ref={containerRef} className="flex lg:flex-row flex-col gap-16 lg:gap-0 lg:min-w-max px-6 md:px-12">
        {items.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i} className="relative flex flex-col lg:items-center lg:w-[450px] snap-center pl-12 lg:pl-0">
              {/* Node (Desktop) */}
              <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.2, type: "spring", stiffness: 200 }}
                  className="w-5 h-5 rounded-full bg-accent-purple shadow-[0_0_20px_rgba(124,58,237,1)] border-4 border-primary"
                />
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1.5, opacity: 0.2 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.2, duration: 1, repeat: Infinity }}
                  className="absolute w-8 h-8 rounded-full bg-accent-purple"
                />
              </div>

              {/* Node (Mobile) */}
              <div className="lg:hidden absolute left-[-20px] top-4 z-10 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.2, type: "spring", stiffness: 200 }}
                  className="w-4 h-4 rounded-full bg-accent-purple shadow-[0_0_15px_rgba(124,58,237,0.8)] border-4 border-primary"
                />
              </div>

              {/* Year Badge */}
              <motion.div
                initial={{ opacity: 0, y: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + i * 0.2, duration: 0.8 }}
                className={cn(
                  "lg:absolute z-10",
                  isEven ? "lg:bottom-[calc(50%+50px)]" : "lg:top-[calc(50%+50px)]",
                  "mb-6 lg:mb-0"
                )}
              >
                <div className="px-5 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-[10px] font-black tracking-[0.2em] text-accent-purple whitespace-nowrap uppercase">
                  {item.year}
                </div>
              </motion.div>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: isEven ? 60 : -60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                className={cn(
                  "lg:absolute w-full lg:w-[400px] group",
                  isEven ? "lg:top-[calc(50%+50px)]" : "lg:bottom-[calc(50%+50px)]"
                )}
              >
                <div className="glass p-10 rounded-[40px] border-white/5 hover:border-accent-purple/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.2)] transition-all duration-500 hover:scale-[1.03] bg-white/5 backdrop-blur-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {type === 'certification' && item.img && (
                    <div className="w-full h-48 md:h-52 mb-8 rounded-[24px] overflow-hidden relative bg-zinc-950/20">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-contain p-2"
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-display font-black mb-3 group-hover:text-accent-purple transition-colors uppercase tracking-tight leading-tight">{item.title}</h3>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-accent-purple rounded-full" />
                    <div className="text-sm font-bold text-zinc-300 uppercase tracking-wide">{item.subtitle}</div>
                  </div>
                  
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">"{item.desc}"</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CertificationSlider = ({ items }: { items: any[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modalImg, setModalImg] = useState<string | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative group/slider w-full">
      {/* Navigation Buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/50 backdrop-blur-md border border-black/10 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-accent-purple hover:border-accent-purple -translate-x-7 hidden md:flex shadow-[0_0_20px_rgba(0,0,0,0.5)]"
      >
        <ArrowRight className="w-6 h-6 rotate-180" />
      </button>
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/50 backdrop-blur-md border border-black/10 flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-accent-purple hover:border-accent-purple translate-x-7 hidden md:flex shadow-[0_0_20px_rgba(0,0,0,0.5)]"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onScroll={handleScroll}
        className={cn(
          "w-full flex gap-8 px-4 py-12 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing flex-nowrap",
          isDragging && "scroll-auto"
        )}
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: i * 0.1,
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            className="min-w-[320px] md:min-w-[400px] flex-shrink-0 group"
          >
            <div className="glass p-8 rounded-[40px] border-white/5 hover:border-accent-purple/30 hover:shadow-[0_0_50px_rgba(124,58,237,0.2)] transition-all duration-700 hover:scale-[1.02] bg-white/5 backdrop-blur-2xl h-[580px] flex flex-col relative overflow-hidden">
              {/* Card Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {item.img && (
                <div className="flex justify-center items-center mb-8 rounded-4xl overflow-hidden relative shadow-lg" style={{height: '240px'}}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-[240px] object-cover rounded-3xl cursor-pointer" 
                    style={{width: '100%', height: '240px', imageRendering: 'auto'}} 
                    referrerPolicy="no-referrer" 
                    onClick={() => setModalImg(item.img)}
                  />
                </div>
              )}

              <div className="px-5 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-[10px] font-black tracking-[0.2em] text-accent-purple whitespace-nowrap w-fit mb-6 uppercase">
                {item.year}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-display font-black mb-4 group-hover:text-accent-purple transition-colors uppercase tracking-tight leading-[1.1]">{item.title}</h3>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-accent-purple rounded-full" />
                <div className="text-sm font-bold text-zinc-300 uppercase tracking-wide">{item.subtitle}</div>
              </div>
              
              <p className="text-zinc-500 text-sm leading-relaxed flex-grow line-clamp-4 font-medium italic">
                "{item.desc}"
              </p>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-start gap-3">
                <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  <Award className="w-4 h-4 text-accent-purple" />
                  Verified
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certificate Modal */}
      {modalImg && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setModalImg(null)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img src={modalImg} alt="Certificate" className="max-w-[90vw] max-h-[80vh] rounded-3xl shadow-2xl border-4 border-accent-purple bg-white" style={{background: '#fff'}} />
            <button className="absolute top-2 right-2 bg-accent-purple text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold shadow-lg" onClick={() => setModalImg(null)}>&times;</button>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="max-w-md mx-auto h-1 bg-white/5 rounded-full mt-8 overflow-hidden">
        <motion.div 
          className="h-full bg-accent-purple shadow-[0_0_10px_rgba(124,58,237,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const education = [
    { 
      year: 'AUG 2023 - PRESENT', 
      title: 'LOVELY PROFESSIONAL UNIVERSITY', 
      subtitle: 'B.Tech in Computer Science and Engineering', 
      desc: 'Currently pursuing B.Tech with CGPA: 7.92' 
    },
    { 
      year: 'JUN 2020 - MAR 2022', 
      title: 'NARAYANA JUNIOR COLLEGE', 
      subtitle: 'Intermediate (PCM)', 
      desc: 'Higher secondary education with 98.1% in Physics, Chemistry, Mathematics' 
    },
    { 
      year: 'APR 2019 - MAY 2020', 
      title: 'SRI CHAITANYA TECHNO SCHOOL', 
      subtitle: 'Matriculation', 
      desc: 'Secondary education with 98.6% marks' 
    }
  ];

  const certifications = [
  { 
    year: 'SEP 2025', 
    title: 'MACHINE LEARNING', 
    subtitle: 'Coursera', 
    desc: 'ML algorithms and neural networks.',
    img: ML
  },
  {
    year: 'AUG 2025',
    title: 'AI-POWERED NLP',
    subtitle: 'AlgoTutor',
    desc: 'NLP concepts and practical tasks.',
    img: NLP
  },
  {
    year: 'NOV 2025',
    title: 'AUTOMATION ANYWHERE',
    subtitle: 'Automation Anywhere',
    desc: 'RPA basics and bot development.',
    img: robotics
  },
  {
    year: 'FEB 2026',
    title: 'ORACLE AI FOUNDATIONS',
    subtitle: 'Oracle University',
    desc: 'AI fundamentals on cloud.',
    img: AI
  },
  {
    year: 'FEB 2026',
    title: 'ORACLE DATA PLATFORM',
    subtitle: 'Oracle University',
    desc: 'Data platforms and cloud services.',
    img: dataPlatform
  },
  {
    year: 'FEB 2026',
    title: 'ORACLE CLOUD INFRA',
    subtitle: 'Oracle University',
    desc: 'Core cloud infrastructure concepts.',
    img: Cloud
  },
  {
    year: 'AUG 2025',
    title: 'DSA',
    subtitle: 'AlgoTutor',
    desc: 'DSA problem-solving and optimization.',
    img: DSA
  }

  ];

  return (
    <section id="experience" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        {/* Education Section */}
        <div className="mb-48 relative">
          <FloatingElements />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <div className="text-[10px] font-black tracking-[0.3em] text-accent-purple mb-4 uppercase">Academic Background</div>
            <TextReveal text="EDUCATION." className="text-4xl md:text-6xl font-display font-black" />
          </motion.div>
          
          <div className="lg:h-[600px] flex items-center relative z-10">
            <Timeline items={education} type="education" />
          </div>
        </div>

        {/* Certifications Section */}
        <div className="relative" id="certification">
          <FloatingElements />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <div className="text-[10px] font-black tracking-[0.3em] text-accent-purple mb-4 uppercase">Professional Growth</div>
            <TextReveal text="CERTIFICATIONS." className="text-4xl md:text-6xl font-display font-black" />
          </motion.div>
          
          <div className="relative z-10">
            <CertificationSlider items={certifications} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-accent-purple/5 blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[40px] border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-7xl font-display font-black mb-8 leading-[0.9] tracking-tighter">
                LET'S <span className="text-accent-purple italic">BUILD</span><br/>
                SOMETHING <span className="text-accent-purple">GREAT.</span>
              </h2>
              <p className="text-zinc-400 mb-12 leading-relaxed text-lg max-w-md">
                Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to new opportunities and collaborations.
              </p>
              <div className="space-y-8">
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent-purple/10 flex items-center justify-center group-hover:bg-accent-purple transition-all duration-500">
                    <Mail className="w-6 h-6 text-accent-purple group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase mb-1">EMAIL</div>
                    <div className="font-bold text-lg group-hover:text-accent-purple transition-colors">roshankarrthik@gmail.com</div>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent-purple/10 flex items-center justify-center group-hover:bg-accent-purple transition-all duration-500">
                    <Globe className="w-6 h-6 text-accent-purple group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase mb-1">MOBILE</div>
                    <div className="font-bold text-lg group-hover:text-accent-purple transition-colors">+91-6302808049</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="relative group"
                >
                  <input type="text" placeholder="NAME" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-xs font-bold tracking-widest focus:border-accent-purple outline-none transition-all focus:bg-white/10" />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-purple group-focus-within:w-full transition-all duration-500" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="relative group"
                >
                  <input type="email" placeholder="EMAIL" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-xs font-bold tracking-widest focus:border-accent-purple outline-none transition-all focus:bg-white/10" />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-purple group-focus-within:w-full transition-all duration-500" />
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="relative group"
              >
                <input type="text" placeholder="SUBJECT" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-xs font-bold tracking-widest focus:border-accent-purple outline-none transition-all focus:bg-white/10" />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-purple group-focus-within:w-full transition-all duration-500" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="relative group"
              >
                <textarea placeholder="MESSAGE" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-xs font-bold tracking-widest focus:border-accent-purple outline-none transition-all focus:bg-white/10 resize-none" />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-purple group-focus-within:w-full transition-all duration-500" />
              </motion.div>
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02, y: -2, boxShadow: "0 15px 40px rgba(124,58,237,0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-6 rounded-2xl btn-gradient text-white font-black text-xs tracking-[0.4em] shadow-[0_10px_30px_rgba(124,58,237,0.3)] transition-all flex items-center justify-center gap-3 group"
              >
                SEND MESSAGE
                <Send className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-xl font-display font-black tracking-tighter">
          ROSHAN<span className="text-accent-purple">.</span>
        </div>
        <div className="text-[10px] font-bold tracking-widest text-zinc-600">
          © 2026 ROSHAN KARTHIK. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6">
          <a href="https://github.com/RoshanKarthik" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/roshan-karthik/" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:roshankarrthik@gmail.com" className="text-zinc-600 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};




// --- Glitch Loader Component ---
const glitchFrames = [
  '█ ▒ ▓ ░ █ ▒ ▓ ░',
  '█▓▒░█▓▒░█▓▒░█▓▒░',
  '█▒░█▒░█▒░█▒░█▒░█',
  '█ ▒ ▓ ░ █ ▒ ▓ ░',
  '█▓▒░█▓▒░█▓▒░█▓▒░',
  '█▒░█▒░█▒░█▒░█▒░█',
  '█ ▒ ▓ ░ █ ▒ ▓ ░',
  '█▓▒░█▓▒░█▓▒░█▓▒░',
  '█▒░█▒░█▒░█▒░█▒░█',
  '█ ▒ ▓ ░ █ ▒ ▓ ░',
  '█▓▒░█▓▒░█▓▒░█▓▒░',
  '█▒░█▒░█▒░█▒░█▒░█',
  '█ ▒ ▓ ░ █ ▒ ▓ ░',
  '█▓▒░█▓▒░█▓▒░█▓▒░',
  '█▒░█▒░█▒░█▒░█▒░█',
  '█ ▒ ▓ ░ █ ▒ ▓ ░',
  '█▓▒░█▓▒░█▓▒░█▓▒░',
  '█▒░█▒░█▒░█▒░█▒░█',
  '█ ▒ ▓ ░ █ ▒ ▓ ░',
  '█▓▒░█▓▒░█▓▒░█▓▒░',
  '█▒░█▒░█▒░█▒░█▒░█',
];

function GlitchLoader() {
  const [frame, setFrame] = useState(0);
  const [showName, setShowName] = useState(false);
  useEffect(() => {
    if (frame < glitchFrames.length - 1) {
      const t = setTimeout(() => setFrame(frame + 1), 60 + Math.random() * 60);
      return () => clearTimeout(t);
    } else {
      setTimeout(() => setShowName(true), 350);
    }
  }, [frame]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      style={{ background: 'repeating-linear-gradient(90deg, #18182A 0 2px, #0A0A1A 2px 8px)' }}
    >
      <div className="relative flex flex-col items-center">
        {/* Flicker Overlay */}
        <motion.div 
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.5, 0.1, 0.4, 0.2] }}
          transition={{ duration: 0.7, repeat: Infinity, repeatType: 'mirror' }}
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'linear-gradient(180deg, transparent 80%, #fff1 100%)' }}
        />
        {/* Glitch Text */}
        {!showName ? (
          <motion.div
            key="glitch"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, filter: [
              'contrast(1.5) brightness(1.2)',
              'contrast(2.5) brightness(2.2) hue-rotate(30deg)',
              'contrast(1.2) brightness(0.8) hue-rotate(-30deg)',
              'contrast(1.5) brightness(1.2)'
            ] }}
            transition={{ duration: 0.2 }}
            className="text-4xl md:text-6xl font-black tracking-widest text-accent-purple select-none"
            style={{ letterSpacing: '0.2em', textShadow: '0 0 12px #8B5CF6, 0 0 2px #fff' }}
          >
            {glitchFrames[frame]}
          </motion.div>
        ) : (
          <motion.div
            key="name"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-black tracking-widest bg-gradient-to-r from-accent-purple via-white to-accent-purple bg-clip-text text-transparent select-none drop-shadow-2xl"
            style={{ letterSpacing: '0.18em', textShadow: '0 0 24px #8B5CF6, 0 0 2px #fff' }}
          >
            ROSHAN KARTHIK
          </motion.div>
        )}
        {/* Scanline effect */}
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: ['-100%', '120%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 w-full h-2 bg-gradient-to-r from-white/30 via-accent-purple/60 to-white/30 opacity-40 blur-sm z-20"
        />
      </div>
    </motion.div>
  );
}
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent-cyan/30 overflow-x-hidden relative">
      <GalaxyBackground />
      <Stars />
      <CursorGlow />

      <AnimatePresence>
        {isLoading && <GlitchLoader />}
      </AnimatePresence>

      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Achievements />
      <Training />
      <Experience />
      <Contact />
      <Footer />
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-purple/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/5 rounded-full blur-[150px]" />
      </div>
    </div>
  );
}

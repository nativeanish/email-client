import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import { CustomButton } from "./component/CustomButton";
import { AnimatedComingSoonButton } from "./component/CMS";

export default function LandingPage() {
  const [, setScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef(null);

  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    const handleMouseEnter = () => {
      setCursorVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const nextId = useRef(0);

  const addRipple = (x: number, y: number) => {
    const newRipple = { x, y, id: nextId.current };
    nextId.current += 1;
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 2000);
  };

  const handleMouseClick = (e: React.MouseEvent) => {
    addRipple(e.clientX, e.clientY);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-teal-800 via-teal-900 to-teal-950 text-white overflow-hidden font-serif"
      onClick={handleMouseClick}
    >
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        onClick={handleMouseClick}
        style={{ pointerEvents: "none" }}
      >
        <motion.div
          ref={cursorRef}
          className="fixed w-40 h-40 rounded-full pointer-events-none z-10"
          animate={{
            x: mousePosition.x - 80,
            y: mousePosition.y - 80,
            opacity: cursorVisible ? 1 : 0,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.5,
          }}
        >
          <motion.div
            className="absolute inset-0 bg-teal-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-teal-300/60 rounded-full"
              animate={{
                x: Math.sin(i * 60 * (Math.PI / 180)) * 60,
                y: Math.cos(i * 60 * (Math.PI / 180)) * 60,
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed w-0 h-0 bg-transparent border-2 border-teal-400/40 rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ width: 0, height: 0, opacity: 0.7 }}
            animate={{
              width: 500,
              height: 500,
              opacity: 0,
              borderWidth: 0.5,
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-700/30 via-teal-900/50 to-teal-950/80"
        ></motion.div>

        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>

        <motion.div
          animate={{
            opacity: [0.1, 0.15, 0.1],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-1/2 h-[40vh] bg-teal-400/10 blur-[100px] transform -rotate-12"
        ></motion.div>

        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, -1, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 right-1/4 w-1/3 h-[30vh] bg-teal-300/10 blur-[80px] transform rotate-12"
        ></motion.div>

        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-200/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              y: [0, Math.random() * -200 - 100],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 15,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}

        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: {
              duration: 40,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="absolute top-[15%] right-[10%] w-[300px] h-[300px] border border-teal-500/20 rounded-full opacity-30"
        ></motion.div>

        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          className="absolute bottom-[20%] left-[15%] w-[250px] h-[250px] border border-teal-400/20 rounded-full opacity-20"
        ></motion.div>

        <svg
          className="absolute bottom-0 left-0 w-full opacity-10"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{
              d: "M0,320L48,288C96,256,192,192,288,186.7C384,181,480,235,576,245.3C672,256,768,224,864,224C960,224,1056,256,1152,261.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            }}
            animate={{
              d: [
                "M0,320L48,288C96,256,192,192,288,186.7C384,181,480,235,576,245.3C672,256,768,224,864,224C960,224,1056,256,1152,261.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,320L48,304C96,288,192,256,288,250.7C384,245,480,267,576,277.3C672,288,768,288,864,272C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
            fill="url(#wave-gradient)"
            strokeWidth="0"
          />
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(45, 212, 191, 0.3)" />
              <stop offset="50%" stopColor="rgba(94, 234, 212, 0.3)" />
              <stop offset="100%" stopColor="rgba(45, 212, 191, 0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-teal-900/40 backdrop-blur-sm shadow-none"
            : "bg-transparent"
        }`}
        style={{
          background: scrolled
            ? "linear-gradient(to bottom, rgba(19, 78, 74, 0.7) 0%, rgba(19, 78, 74, 0) 100%)"
            : "transparent",
        }}
      >
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-400 blur-sm rounded-full opacity-30"></div>
                <Mail className="h-6 w-6 text-teal-200 relative" />
              </div>
              <span className="text-xl font-serif font-light tracking-wide text-teal-100">
                Permaemail
              </span>
            </div>

            <div className="flex items-center gap-4 z-10">
              <AnimatedComingSoonButton />
            </div>
          </div>
        </div>
      </header>

      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <div className="text-teal-200/80 uppercase tracking-widest text-sm mb-6 font-sans">
                Coming Soon
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-tight mb-8 text-teal-100">
                Permaemail
              </h1>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-teal-200/90 mb-8">
                Decentralized Email
              </h2>
              <p className="text-xl md:text-2xl text-teal-200/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                Today's email is compromised. It's a system that has to be
                <span className="italic"> reimagined</span>, and given a
                foundation—not an extension of outdated protocols that sacrifice
                your privacy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                heroInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="relative mb-16"
            >
              <div className="relative mx-auto max-w-3xl">
                <div className="bg-teal-800/20 backdrop-blur-md border border-teal-700/30 p-6 rounded-sm overflow-hidden">
                  <div className="flex items-center justify-between mb-6 border-b border-teal-700/30 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400/70"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400/70"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400/70"></div>
                    </div>
                    <div className="text-teal-200/80 font-sans text-sm">
                      Permaemail Client
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 border-r border-teal-700/30 pr-4">
                      <div className="text-teal-100 font-sans text-sm font-medium mb-4">
                        Folders
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-teal-200/90 font-sans text-sm bg-teal-700/20 p-2 rounded-sm">
                          <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                          <span>Inbox</span>
                        </div>
                        <div className="flex items-center gap-2 text-teal-200/70 font-sans text-sm p-2">
                          <div className="w-2 h-2 bg-transparent rounded-full"></div>
                          <span>Sent</span>
                        </div>
                        <div className="flex items-center gap-2 text-teal-200/70 font-sans text-sm p-2">
                          <div className="w-2 h-2 bg-transparent rounded-full"></div>
                          <span>Drafts</span>
                        </div>
                        <div className="flex items-center gap-2 text-teal-200/70 font-sans text-sm p-2">
                          <div className="w-2 h-2 bg-transparent rounded-full"></div>
                          <span>Archive</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-9">
                      <div className="text-teal-100 font-sans text-sm font-medium mb-4 flex justify-between items-center">
                        <span>Inbox</span>
                        <span className="text-teal-400 text-xs">
                          Secured by AO Blockchain
                        </span>
                      </div>

                      {[
                        {
                          sender: "AO Network",
                          subject: "Your decentralized email is ready",
                          preview:
                            "Welcome to the future of secure communication...",
                          time: "Just now",
                          unread: true,
                        },
                        {
                          sender: "Security Team",
                          subject: "End-to-end encryption enabled",
                          preview:
                            "Your privacy is our top priority. All messages are now...",
                          time: "2h ago",
                          unread: true,
                        },
                        {
                          sender: "Permaemail",
                          subject: "Getting started with Permaemail",
                          preview:
                            "Here's everything you need to know about your new...",
                          time: "Yesterday",
                          unread: false,
                        },
                      ].map((email, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={
                            heroInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -10 }
                          }
                          transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                          className={`mb-3 p-3 border ${
                            email.unread
                              ? "border-teal-500/30 bg-teal-700/10"
                              : "border-teal-700/30"
                          } rounded-sm`}
                        >
                          <div className="flex justify-between mb-1">
                            <div className="font-sans text-sm font-medium text-teal-100 flex items-center gap-2">
                              {email.unread && (
                                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                              )}
                              {email.sender}
                            </div>
                            <div className="text-teal-200/60 font-sans text-xs">
                              {email.time}
                            </div>
                          </div>
                          <div className="font-sans text-sm text-teal-200/90 mb-1">
                            {email.subject}
                          </div>
                          <div className="font-sans text-xs text-teal-200/70 truncate">
                            {email.preview}
                          </div>
                        </motion.div>
                      ))}

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={
                          heroInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 10 }
                        }
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="mt-4"
                      >
                        <CustomButton variant="outline" size="md" fullWidth>
                          Compose New Email
                        </CustomButton>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -z-10 -bottom-6 -right-6 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl"
                ></motion.div>

                <motion.div
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -z-10 -top-6 -left-6 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl"
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-teal-800/30 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Mail className="h-5 w-5 text-teal-300" />
                <span className="text-lg font-serif font-light text-teal-100">
                  Permaemail
                </span>
              </div>
              <div className="text-teal-200/60 text-sm font-sans">
                © {new Date().getFullYear()} Permaemail. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CheckCircle2,
  Coins,
  Droplets,
  Dumbbell,
  Flame,
  ScanLine,
  Trophy,
  Wheat,
  XCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Confetti } from "@/components/gamification/Confetti";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { lessons, quizQuestions } from "@/data/mockData";
import { getLevel, getLevelProgress, useAppStore } from "@/store/useAppStore";

const lessonIcons: Record<string, LucideIcon> = {
  Dumbbell,
  Wheat,
  Droplets,
  Coins,
  ScanLine
};

export function Academy() {
  const user = useAppStore((state) => state.user);
  const addXp = useAppStore((state) => state.addXp);
  const markLessonComplete = useAppStore((state) => state.markLessonComplete);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [confetti, setConfetti] = useState(false);
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId) ?? null;
  const activeQuestions = useMemo(
    () =>
      activeLesson
        ? quizQuestions.filter((question) => question.lessonId === activeLesson.id).slice(0, 5)
        : [],
    [activeLesson]
  );
  const question = activeQuestions[questionIndex];

  const startLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const answer = (value: string) => {
    if (!question || isCorrect !== null) {
      return;
    }
    const correct = value === question.correctAnswer;
    setSelectedAnswer(value);
    setIsCorrect(correct);
    if (correct) {
      addXp(20);
      setConfetti(true);
      window.setTimeout(() => setConfetti(false), 1600);
    }
  };

  const next = () => {
    if (!activeLesson) {
      return;
    }
    const lastQuestion = questionIndex >= activeQuestions.length - 1;
    if (lastQuestion) {
      markLessonComplete(activeLesson.id, activeLesson.xpReward);
      setActiveLessonId(null);
    } else {
      setQuestionIndex((current) => current + 1);
    }
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <div className="space-y-6">
      <Confetti active={confetti} />

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card className="bg-gradient-to-br from-green-600 to-lime-500 text-white">
          <Badge tone="premium">NutriAcademy</Badge>
          <h1 className="mt-4 text-3xl font-black">Learn nutrition, earn XP</h1>
          <p className="mt-2 max-w-2xl text-green-50">
            Duolingo-inspired lessons teach proteins, carbohydrates, lipids, budget nutrition, and food labels.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/15 p-4">
              <Trophy size={20} />
              <p className="mt-2 text-2xl font-black">Level {getLevel(user.xp)}</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-4">
              <Flame size={20} />
              <p className="mt-2 text-2xl font-black">{user.streak} days</p>
            </div>
            <div className="rounded-2xl bg-white/15 p-4">
              <BookOpen size={20} />
              <p className="mt-2 text-2xl font-black">{user.completedLessons.length}/5</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">XP progress</p>
              <h2 className="text-2xl font-black">{user.xp} XP</h2>
            </div>
            <Badge tone="green">Level {getLevel(user.xp)}</Badge>
          </div>
          <ProgressBar value={getLevelProgress(user.xp)} className="mt-5" />
          <p className="mt-3 text-sm text-slate-500">Reach the next level every 500 XP.</p>
        </Card>
      </section>

      {activeLesson && question ? (
        <Card className="overflow-hidden p-0">
          <div className={`bg-gradient-to-br ${activeLesson.color} p-5 text-white`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-white/75">
                  Question {questionIndex + 1}/{activeQuestions.length}
                </p>
                <h2 className="mt-2 text-2xl font-black">{activeLesson.title}</h2>
              </div>
              <Button variant="outline" className="border-white/40 bg-white/15 text-white hover:bg-white/25" onClick={() => setActiveLessonId(null)}>
                Exit
              </Button>
            </div>
            <ProgressBar value={((questionIndex + 1) / activeQuestions.length) * 100} className="mt-5 bg-white/20" barClassName="bg-white" />
          </div>
          <div className="p-5">
            <h3 className="text-2xl font-black">{question.prompt}</h3>
            {question.type === "image-selection" && question.imageOptions ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {question.imageOptions.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => answer(option.label)}
                    className={`overflow-hidden rounded-3xl border text-left transition ${
                      selectedAnswer === option.label ? "border-nutri-primary ring-2 ring-nutri-primary" : "bg-white dark:bg-slate-950"
                    }`}
                  >
                    <img src={option.image} alt={option.label} className="h-36 w-full object-cover" />
                    <span className="block p-3 font-black">{option.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => answer(option)}
                    className={`rounded-2xl border p-4 text-left font-black transition ${
                      selectedAnswer === option
                        ? "border-nutri-primary bg-green-50 text-nutri-secondary dark:bg-green-500/15"
                        : "bg-white hover:border-nutri-primary dark:bg-slate-950"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {isCorrect !== null ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-5 rounded-3xl p-4 ${
                  isCorrect ? "bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                  <div>
                    <p className="font-black">{isCorrect ? "Correct, +20 XP" : "Not quite"}</p>
                    <p className="text-sm">{question.explanation}</p>
                  </div>
                </div>
              </motion.div>
            ) : null}

            <div className="mt-6 flex justify-end">
              <Button onClick={next} disabled={isCorrect === null}>
                {questionIndex >= activeQuestions.length - 1 ? "Finish lesson" : "Next question"}
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {lessons.map((lesson) => {
            const Icon = lessonIcons[lesson.icon];
            const completed = user.completedLessons.includes(lesson.id);
            return (
              <motion.button
                key={lesson.id}
                whileHover={{ y: -4 }}
                onClick={() => startLesson(lesson.id)}
                className="rounded-3xl border bg-white p-4 text-left shadow-soft transition dark:bg-slate-900"
              >
                <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${lesson.color} text-white`}>
                  <Icon size={26} />
                </div>
                <h2 className="mt-4 text-xl font-black">{lesson.title}</h2>
                <p className="mt-2 text-sm text-slate-500">{lesson.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Badge tone={completed ? "green" : "slate"}>{completed ? "Completed" : `${lesson.xpReward} XP`}</Badge>
                  <span className="text-sm font-bold text-nutri-secondary">Start</span>
                </div>
              </motion.button>
            );
          })}
        </section>
      )}
    </div>
  );
}

// Tiger Navigator - Interactive Grant Prototype Application
// Structured around the 12 MongoDB collections & Meteor.js Rule Engine specified in the Grant Plan

const INITIAL_DB = {
  currentUser: {
    id: "u_pouncer_2027",
    name: "Pouncer",
    role: "student", // "student" | "educator"
    grade: 12,
    cohort: "Class of 2027",
    reviewStatus: "Annual review due",
    verifiedByEducator: true,
    verifiedDate: "Oct 24, 2026",
    verifiedBy: "Dr. M. Carter (UHS Academic Counselor)"
  },
  studentProfiles: {
    pathway: "Sport & Human Performance",
    postsecondaryDirection: "Four-year university",
    possibleMajor: "Exercise science or sport and human performance",
    careerInterests: "Coaching and youth development\nExercise science and movement\nStrength and conditioning",
    institutionsOfInterest: "University of Memphis — College of Health Sciences (Exercise, Sport & Movement Sciences)\nUniversity of Tennessee, Knoxville — Kinesiology",
    capstoneTitle: "Youth Basketball Biomechanics & Injury Prevention Clinic",
    capstoneSummary: "Developing a 6-week dynamic warm-up and ankle/knee stability curriculum for UHS junior varsity and middle school basketball athletes, mentored by UofM Human Performance Lab staff."
  },
  academicRecords: {
    unweightedGpa: 3.45,
    weightedGpa: 3.72,
    actComposite: 22,
    actEnglish: 23,
    actMath: 20,
    actReading: 24,
    actScience: 21,
    plannedCredits: 25.0,
    minimumCredits: 22.0,
    coursesPlanned: 25,
    serviceHours: 48,
    creditsBySubject: [
      { subject: "English", earned: 4.0, required: 4.0 },
      { subject: "Mathematics", earned: 4.0, required: 4.0 },
      { subject: "Science", earned: 2.0, required: 3.0, note: "Need 1.0 credit (e.g., Anatomy & Physiology or Chemistry)" },
      { subject: "Social Studies", earned: 3.0, required: 3.0 },
      { subject: "World Languages", earned: 2.0, required: 2.0 },
      { subject: "Pathway (Sport & Human Perf.)", earned: 3.0, required: 3.0 },
      { subject: "Fine Arts", earned: 1.0, required: 1.0 },
      { subject: "Wellness", earned: 1.5, required: 1.5 },
      { subject: "Personal Finance", earned: 0.5, required: 0.5 }
    ]
  },
  eligibilityRules: {
    version: "v2026.2 (Effective Fall 2026 - Spring 2027)",
    sourceReference: "University of Memphis Dual Enrollment Policy & TSAC Grant Handbook",
    lastUpdated: "2026-10-15",
    generalDeMinGpa: 3.0,
    generalDeMinActComposite: 19,
    admissionIndexTarget: 82, // Formula: (GPA * 20) + ACT Composite >= 82
    tsacMinGpa: 2.75,
    courseRules: [
      {
        id: "engl_1010",
        code: "ENGL 1010",
        title: "English Composition I",
        credits: 3,
        minGpa: 3.0,
        minActComposite: 19,
        subscoreField: "actEnglish",
        subscoreLabel: "ACT English",
        minSubscore: 18
      },
      {
        id: "math_1710",
        code: "MATH 1710",
        title: "College Algebra",
        credits: 3,
        minGpa: 3.0,
        minActComposite: 19,
        subscoreField: "actMath",
        subscoreLabel: "ACT Mathematics",
        minSubscore: 22
      },
      {
        id: "esms_2015",
        code: "ESMS 2015",
        title: "Intro to Exercise Science",
        credits: 3,
        minGpa: 3.0,
        minActComposite: 19,
        subscoreField: "actScience",
        subscoreLabel: "ACT Science",
        minSubscore: 19
      },
      {
        id: "comm_2381",
        code: "COMM 2381",
        title: "Oral Communication",
        credits: 3,
        minGpa: 3.0,
        minActComposite: 19,
        subscoreField: "actEnglish",
        subscoreLabel: "ACT English",
        minSubscore: 18
      }
    ]
  },
  dualEnrollmentRecords: [
    { id: "de1", courseNum: 1, term: "Fall 2025", code: "ENGL 1010", title: "English Composition I", credits: 3, status: "Completed", grade: "A", grantTier: "100% Tuition Covered ($540)", outOfPocket: "$0" },
    { id: "de2", courseNum: 2, term: "Spring 2026", code: "ENGL 1020", title: "English Composition II", credits: 3, status: "Completed", grade: "B+", grantTier: "100% Tuition Covered ($540)", outOfPocket: "$0" },
    { id: "de3", courseNum: 3, term: "Fall 2026", code: "ESMS 2015", title: "Intro to Exercise Science", credits: 3, status: "Enrolled", grade: "In Progress", grantTier: "100% Tuition Covered ($540)", outOfPocket: "$0" },
    { id: "de4", courseNum: 4, term: "Fall 2026", code: "PSYC 1030", title: "General Psychology", credits: 3, status: "Enrolled", grade: "In Progress", grantTier: "100% Tuition Covered ($540)", outOfPocket: "$0" },
    { id: "de5", courseNum: 5, term: "Spring 2027", code: "COMM 2381", title: "Oral Communication", credits: 3, status: "Planned", grade: "Planned", grantTier: "100% Tuition Covered ($540)", outOfPocket: "$0" }
  ],
  scholarRequirements: {
    minGpa: 3.5,
    minAct: 23,
    minDeCourses: 4,
    minServiceHours: 50,
    requireCapstone: true,
    requireZeroDiscipline: true,
    officialConfirmationStatus: "Projected — Pending Spring 2027 Verification"
  },
  experiences: [
    {
      id: "exp1",
      title: "UHS Varsity Basketball — Assistant Strength & Warm-up Leader",
      type: "Work-Based Learning / Athletics",
      term: "Fall 2025 – Present",
      hours: 65,
      verified: true,
      reflection: "Led pre-practice dynamic mobility routines for 18 players. Learned how to communicate biomechanics cues clearly and adapt drills when athletes had ankle stiffness.",
      competencies: ["Leadership & Coaching", "Kinesiology Applied Practice", "Communication"]
    },
    {
      id: "exp2",
      title: "University of Memphis Human Performance Lab Shadowing",
      type: "Internship / Capstone Fieldwork",
      term: "Summer 2026",
      hours: 24,
      verified: true,
      reflection: "Observed force-plate jump assessments and VO2 max testing with graduate researchers. Realized I enjoy data-driven injury prevention as much as on-court coaching.",
      competencies: ["Data Interpretation", "Biomechanics Inquiry", "Professionalism"]
    },
    {
      id: "exp3",
      title: "Memphis Youth Community Hoops Clinic Volunteer",
      type: "Community Service",
      term: "Spring 2026",
      hours: 48,
      verified: true,
      reflection: "Coached 5th and 6th graders on fundamental footwork and hydration habits. Built patience and structured 45-minute station rotations.",
      competencies: ["Youth Mentorship", "Program Organization", "Community Engagement"]
    }
  ],
  competencies: [
    { id: "c1", name: "Leadership & Coaching", confidence: "High (3 experiences)", aiInterpretation: "Consistently takes ownership of group warm-ups and translates technical movement concepts for younger peers.", studentApproved: true },
    { id: "c2", name: "Biomechanics & Movement Analysis", confidence: "Emerging-Strong (2 experiences)", aiInterpretation: "Connects lab instrumentation (force plates) with practical athletic injury prevention in the Capstone proposal.", studentApproved: true },
    { id: "c3", name: "Quantitative Readiness for STEM", confidence: "Focus Area (ACT Math: 20)", aiInterpretation: "Strong applied interest in lab data, though raising ACT Math from 20 to 22 will unlock DE College Algebra (MATH 1710) needed for Exercise Science.", studentApproved: true }
  ],
  conversations: [
    {
      sender: "ai",
      text: "Good morning, Pouncer! Looking at your Summer 2026 shadowing at the UofM Human Performance Lab and your Capstone draft on basketball injury prevention, you've built strong hands-on evidence in kinesiology. How would you like to connect these experiences to your Spring 2027 course plan?"
    },
    {
      sender: "student",
      text: "I want to make sure I qualify for the UofM Exercise Science major and also earn Senior Scholar status before graduation."
    },
    {
      sender: "ai",
      text: "Great goal. Our rule engine shows two high-impact steps right now:\n1. Senior Scholar & Science Credit: You have 2.0 / 3.0 Science credits and a 3.45 unweighted GPA (target: 3.50). Completing Anatomy & Physiology with an A this year satisfies your final Science credit AND lifts your GPA to 3.51.\n2. Dual Enrollment Math: Your ACT Math subscore is 20, and UofM MATH 1710 requires a 22. Would you like to add an ACT Math prep milestone to your Action Plan?"
    }
  ],
  actionPlans: [
    { id: "ap1", title: "Complete 3rd Science Credit (Anatomy & Physiology)", category: "Graduation & Senior Scholar", due: "May 2027", status: "In Progress", linkedFeature: "Four-year academic plan" },
    { id: "ap2", title: "Retake ACT to raise Math subscore from 20 to 22+ (Unlocks DE MATH 1710)", category: "Dual Enrollment Eligibility", due: "Dec 2026", status: "Action Needed", linkedFeature: "DE Calculator" },
    { id: "ap3", title: "Log 2 additional community service hours (48 / 50 hrs complete)", category: "Senior Scholar Status", due: "Jan 2027", status: "Almost Done", linkedFeature: "Senior Scholar Tracker" },
    { id: "ap4", title: "Submit Capstone IRB / Faculty Mentor Sign-off with UofM Lab", category: "Capstone Portfolio", due: "Nov 2026", status: "In Progress", linkedFeature: "Capstone Proposal" }
  ],
  resources: [
    { id: "r1", title: "UHS 2026–27 Program of Studies", category: "Academic Catalog", summary: "Official 22-credit graduation requirements, pathway sequences, and Dual Enrollment policies." },
    { id: "r2", title: "University of Memphis Dual Enrollment Course Matrix", category: "Dual Enrollment", summary: "ACT Composite, English, and Math subscore prerequisites for UofM general education courses." },
    { id: "r3", title: "TSAC Tennessee Dual Enrollment Grant Rules", category: "Financial Aid", summary: "Details on the 10-course lifetime limit: Courses 1–5 covered at 100% ($540/3-hr course); Courses 6–10 at $100/credit hr." },
    { id: "r4", title: "UHS Senior Scholar Designation Rubric", category: "Honors & Capstone", summary: "Criteria for Senior Scholar medallion: 3.5+ GPA, 23+ ACT, 4+ DE courses, 50+ service hours, and Capstone defense." }
  ]
};

function loadState() {
  try {
    const saved = localStorage.getItem("tiger_navigator_v1");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not read localStorage", e);
  }
  return JSON.parse(JSON.stringify(INITIAL_DB));
}

function saveState(state) {
  try {
    localStorage.setItem("tiger_navigator_v1", JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
}

// Rule Engine: Pure deterministic academic calculations (independent of AI, per Section 3 of Grant Plan)
function evaluateDualEnrollment(gpa, actComp, actEng, actMath, actSci, rules) {
  const actualIndex = Math.round((gpa * 20) + actComp);
  const meetsGeneralGpa = gpa >= rules.generalDeMinGpa;
  const meetsGeneralAct = actComp >= rules.generalDeMinActComposite;
  const meetsIndex = actualIndex >= rules.admissionIndexTarget;
  const generalAdmissionEligible = (meetsGeneralGpa && meetsGeneralAct) || meetsIndex;
  const tsacGrantEligible = gpa >= rules.tsacMinGpa;

  // Calculate minimum ACT needed at current GPA to hit Admission Index target, or minimum GPA at current ACT
  const minActForIndex = Math.max(1, Math.ceil(rules.admissionIndexTarget - (gpa * 20)));
  const minGpaForIndex = Math.max(0, ((rules.admissionIndexTarget - actComp) / 20)).toFixed(2);

  const courseEvaluations = rules.courseRules.map(course => {
    const subVal = course.subscoreField === "actEnglish" ? actEng :
                   course.subscoreField === "actMath" ? actMath : actSci;
    const gpaOk = gpa >= course.minGpa;
    const compOk = actComp >= course.minActComposite;
    const subOk = subVal >= course.minSubscore;
    const eligible = gpaOk && compOk && subOk;

    const missingReasons = [];
    if (!gpaOk) missingReasons.push(`GPA ${gpa.toFixed(2)} is below ${course.minGpa.toFixed(2)} (+${(course.minGpa - gpa).toFixed(2)} needed)`);
    if (!compOk) missingReasons.push(`ACT Composite ${actComp} is below ${course.minActComposite} (+${course.minActComposite - actComp} pts needed)`);
    if (!subOk) missingReasons.push(`${course.subscoreLabel} ${subVal} is below ${course.minSubscore} (+${course.minSubscore - subVal} pts needed)`);

    return {
      ...course,
      currentSubscore: subVal,
      eligible,
      missingReasons
    };
  });

  return {
    actualIndex,
    meetsGeneralGpa,
    meetsGeneralAct,
    meetsIndex,
    generalAdmissionEligible,
    tsacGrantEligible,
    minActForIndex,
    minGpaForIndex,
    courseEvaluations
  };
}

function evaluateSeniorScholar(gpa, actComp, deCount, serviceHours, reqs) {
  const checks = [
    {
      label: "Cumulative Unweighted GPA",
      current: gpa.toFixed(2),
      target: `${reqs.minGpa.toFixed(2)}+`,
      met: gpa >= reqs.minGpa,
      gap: gpa >= reqs.minGpa ? "Satisfied" : `Need +${(reqs.minGpa - gpa).toFixed(2)} GPA points`
    },
    {
      label: "ACT Composite Benchmark",
      current: `${actComp}`,
      target: `${reqs.minAct}+`,
      met: actComp >= reqs.minAct,
      gap: actComp >= reqs.minAct ? "Satisfied" : `Need +${reqs.minAct - actComp} ACT composite point(s)`
    },
    {
      label: "Dual Enrollment Courses (Completed/Planned)",
      current: `${deCount} courses`,
      target: `${reqs.minDeCourses}+ courses`,
      met: deCount >= reqs.minDeCourses,
      gap: deCount >= reqs.minDeCourses ? "Satisfied" : `Need ${reqs.minDeCourses - deCount} more DE course(s)`
    },
    {
      label: "Approved Community Service Hours",
      current: `${serviceHours} hrs`,
      target: `${reqs.minServiceHours} hrs`,
      met: serviceHours >= reqs.minServiceHours,
      gap: serviceHours >= reqs.minServiceHours ? "Satisfied" : `Need ${reqs.minServiceHours - serviceHours} more verified hour(s)`
    },
    {
      label: "Senior Capstone Proposal & Defense",
      current: "Draft Active",
      target: "Approved & Defended",
      met: true,
      gap: "Proposal in progress with faculty mentor"
    }
  ];

  const metCount = checks.filter(c => c.met).length;
  return {
    checks,
    metCount,
    totalCount: checks.length,
    allMet: metCount === checks.length
  };
}

// Main React App using standard React.createElement (no build step required, works everywhere)
const e = React.createElement;
const { useState, useEffect } = React;

function TigerNavigatorApp() {
  const [db, setDb] = useState(loadState);
  const [activeTab, setActiveTab] = useState("home"); // "home" | "plan" | "de_grant" | "scholar" | "capstone_ai" | "educator"
  const [planSubTab, setPlanSubTab] = useState("four_year"); // "profile" | "four_year" | "annual_review"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Hypothetical Sandbox state for Calculators (defaults to student's actual records)
  const [simGpa, setSimGpa] = useState(db.academicRecords.unweightedGpa);
  const [simActComp, setSimActComp] = useState(db.academicRecords.actComposite);
  const [simActEng, setSimActEng] = useState(db.academicRecords.actEnglish);
  const [simActMath, setSimActMath] = useState(db.academicRecords.actMath);
  const [simActSci, setSimActSci] = useState(db.academicRecords.actScience);
  const [simService, setSimService] = useState(db.academicRecords.serviceHours);
  const [simDeCount, setSimDeCount] = useState(db.dualEnrollmentRecords.length);

  // AI chat input
  const [chatInput, setChatInput] = useState("");
  // New experience form
  const [newExpTitle, setNewExpTitle] = useState("");
  const [newExpType, setNewExpType] = useState("Capstone Activity");
  const [newExpHours, setNewExpHours] = useState(10);
  const [newExpReflection, setNewExpReflection] = useState("");

  useEffect(() => {
    saveState(db);
  }, [db]);

  function showNotification(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  }

  function resetDemoData() {
    localStorage.removeItem("tiger_navigator_v1");
    const fresh = JSON.parse(JSON.stringify(INITIAL_DB));
    setDb(fresh);
    setSimGpa(fresh.academicRecords.unweightedGpa);
    setSimActComp(fresh.academicRecords.actComposite);
    setSimActEng(fresh.academicRecords.actEnglish);
    setSimActMath(fresh.academicRecords.actMath);
    setSimActSci(fresh.academicRecords.actScience);
    setSimService(fresh.academicRecords.serviceHours);
    setSimDeCount(fresh.dualEnrollmentRecords.length);
    showNotification("Demo data reset to Pouncer's default profile.");
  }

  function syncSandboxToActual() {
    setSimGpa(db.academicRecords.unweightedGpa);
    setSimActComp(db.academicRecords.actComposite);
    setSimActEng(db.academicRecords.actEnglish);
    setSimActMath(db.academicRecords.actMath);
    setSimActSci(db.academicRecords.actScience);
    setSimService(db.academicRecords.serviceHours);
    setSimDeCount(db.dualEnrollmentRecords.length);
    showNotification("Hypothetical sliders reset to official student record.");
  }

  const deEvalActual = evaluateDualEnrollment(
    db.academicRecords.unweightedGpa,
    db.academicRecords.actComposite,
    db.academicRecords.actEnglish,
    db.academicRecords.actMath,
    db.academicRecords.actScience,
    db.eligibilityRules
  );

  const deEvalSim = evaluateDualEnrollment(
    Number(simGpa),
    Number(simActComp),
    Number(simActEng),
    Number(simActMath),
    Number(simActSci),
    db.eligibilityRules
  );

  const scholarEvalSim = evaluateSeniorScholar(
    Number(simGpa),
    Number(simActComp),
    Number(simDeCount),
    Number(simService),
    db.scholarRequirements
  );

  const isHypothetical =
    Number(simGpa) !== db.academicRecords.unweightedGpa ||
    Number(simActComp) !== db.academicRecords.actComposite ||
    Number(simActEng) !== db.academicRecords.actEnglish ||
    Number(simActMath) !== db.academicRecords.actMath ||
    Number(simActSci) !== db.academicRecords.actScience ||
    Number(simService) !== db.academicRecords.serviceHours ||
    Number(simDeCount) !== db.dualEnrollmentRecords.length;

  function handleSendChat(promptText) {
    const textToSend = promptText || chatInput;
    if (!textToSend.trim()) return;

    const lower = textToSend.toLowerCase();
    let aiReply = "Based on the UHS 2026–27 Program of Studies and your Sport & Human Performance pathway, you are on track with 25.0 planned credits. Make sure to complete your 3rd credit of lab science (such as Anatomy & Physiology) and raise your ACT Math from 20 to 22 if you want to take Dual Enrollment College Algebra (MATH 1710) in Spring 2027.";

    if (lower.includes("math") || lower.includes("act") || lower.includes("dual")) {
      aiReply = `Deterministic Rule Engine Check: Your current GPA (${db.academicRecords.unweightedGpa}) and ACT Composite (${db.academicRecords.actComposite}) qualify you for general UofM Dual Enrollment and the TSAC Grant! However, MATH 1710 requires an ACT Math subscore of ${db.eligibilityRules.courseRules[1].minSubscore} (yours is ${db.academicRecords.actMath}). Raising ACT Math by +2 points unlocks MATH 1710 and also pushes your ACT Composite toward the 23 needed for Senior Scholar.`;
    } else if (lower.includes("scholar") || lower.includes("senior")) {
      aiReply = `For UHS Senior Scholar status, you currently meet 2 of 5 benchmarks outright and are right on the doorstep of the other 3: (1) GPA is ${db.academicRecords.unweightedGpa} vs ${db.scholarRequirements.minGpa} required, (2) ACT is ${db.academicRecords.actComposite} vs ${db.scholarRequirements.minAct} required, and (3) Service hours are ${db.academicRecords.serviceHours} vs ${db.scholarRequirements.minServiceHours} required (just 2 hours away!). Try the Senior Scholar simulator tab to test how one semester affects your projection.`;
    } else if (lower.includes("capstone") || lower.includes("basketball") || lower.includes("strength")) {
      aiReply = `Reflection Synthesis: Across your 3 logged experiences (137 total hours), recurring competencies include Applied Kinesiology, Youth Mentorship, and Force-Plate Data Analysis. I recommend highlighting your UofM Human Performance Lab shadowing in Section 2 of your Capstone Proposal as evidence of postsecondary readiness.`;
    }

    setDb(prev => ({
      ...prev,
      conversations: [
        ...prev.conversations,
        { sender: "student", text: textToSend },
        { sender: "ai", text: aiReply }
      ]
    }));
    setChatInput("");
  }

  function handleAddExperience(ev) {
    ev.preventDefault();
    if (!newExpTitle.trim()) return;
    const added = {
      id: "exp_" + Date.now(),
      title: newExpTitle,
      type: newExpType,
      term: "Fall 2026",
      hours: Number(newExpHours) || 5,
      verified: false,
      reflection: newExpReflection || "Reflected on leadership and problem-solving in real-world setting.",
      competencies: ["Applied Learning", "Self-Direction"]
    };
    setDb(prev => ({
      ...prev,
      experiences: [added, ...prev.experiences],
      academicRecords: {
        ...prev.academicRecords,
        serviceHours: prev.academicRecords.serviceHours + (newExpType === "Community Service" ? Number(newExpHours) : 0)
      }
    }));
    setNewExpTitle("");
    setNewExpReflection("");
    showNotification("Experience logged & analyzed for competencies!");
  }

  // Render Top Header
  const navItems = [
    { id: "home", label: "Home" },
    { id: "plan", label: "My Plan" },
    { id: "de_grant", label: "Dual Enrollment" },
    { id: "scholar", label: "Senior Scholar" },
    { id: "capstone_ai", label: "Capstone & Reflection" }
  ];
  if (db.currentUser.role === "educator") {
    navItems.push({ id: "educator", label: "Rule Admin" });
  }

  const userFirstName = db.currentUser.role === "student" ? "Pouncer" : "Carter";
  const userInitial = userFirstName.charAt(0);

  const header = e("header", { className: "top-bar", role: "banner" },
    e("div", { className: "top-bar-inner" },
      e("button", {
        type: "button",
        className: "brand-group",
        onClick: () => { setActiveTab("home"); setMobileMenuOpen(false); },
        "aria-label": "Tiger Navigator Home"
      },
        e("img", {
          src: "./uhs-logo.jpg",
          alt: "University High School Tiger Logo",
          className: "brand-logo"
        }),
        e("div", { className: "brand-titles" },
          e("span", { className: "brand-name" }, "Tiger Navigator"),
          e("span", { className: "brand-tagline" }, "University High School")
        )
      ),
      e("nav", {
        id: "primary-navigation",
        className: `top-nav ${mobileMenuOpen ? "open" : ""}`,
        "aria-label": "Main navigation"
      },
        navItems.map(tab =>
          e("button", {
            key: tab.id,
            type: "button",
            className: `nav-btn ${activeTab === tab.id ? "active" : ""}`,
            "aria-current": activeTab === tab.id ? "page" : undefined,
            onClick: () => {
              setActiveTab(tab.id);
              setMobileMenuOpen(false);
            }
          }, tab.label)
        )
      ),
      e("div", { className: "user-controls" },
        e("div", {
          className: "role-switcher",
          role: "group",
          "aria-label": "View mode"
        },
          e("button", {
            type: "button",
            className: `role-btn ${db.currentUser.role === "student" ? "active" : ""}`,
            "aria-pressed": db.currentUser.role === "student" ? "true" : "false",
            onClick: () => {
              setDb(p => ({ ...p, currentUser: { ...p.currentUser, role: "student" } }));
              if (activeTab === "educator") setActiveTab("home");
              showNotification("Switched to Student View (Pouncer)");
            }
          }, "Student"),
          e("button", {
            type: "button",
            className: `role-btn ${db.currentUser.role === "educator" ? "active" : ""}`,
            "aria-pressed": db.currentUser.role === "educator" ? "true" : "false",
            onClick: () => {
              setDb(p => ({ ...p, currentUser: { ...p.currentUser, role: "educator" } }));
              setActiveTab("educator");
              showNotification("Switched to Educator / Counselor View");
            }
          }, "Educator")
        ),
        e("div", { className: "user-profile" },
          e("span", { className: "user-avatar", "aria-hidden": "true" }, userInitial),
          e("span", { className: "user-firstname" }, userFirstName),
          e("span", { className: "demo-badge" }, "Fictional demo")
        ),
        e("button", {
          type: "button",
          className: "hamburger-btn",
          "aria-label": mobileMenuOpen ? "Close navigation menu" : "Open navigation menu",
          "aria-expanded": mobileMenuOpen ? "true" : "false",
          "aria-controls": "primary-navigation",
          onClick: () => setMobileMenuOpen(prev => !prev)
        },
          e("span", { className: "hamburger-icon", "aria-hidden": "true" }, mobileMenuOpen ? "✕" : "☰")
        )
      )
    )
  );

  // Render View 1: Workspace Home (Inspired by Screenshot 3 + Project Plan Dashboard)
  function renderHome() {
    const remainingGrantCourses = 10 - db.dualEnrollmentRecords.length;
    return e("div", null,
      // Hero greeting matching Screenshot 3 with official UHS Tiger Logo
      e("div", { className: "hero-banner" },
        e("div", null,
          e("div", { className: "hero-eyebrow" }, `${db.currentUser.cohort.toUpperCase()} · ${db.studentProfiles.pathway.toUpperCase()}`),
          e("h2", { className: "hero-title" }, "Good morning, Pouncer."),
          e("p", { className: "hero-subtitle" },
            "Explore your High School & Beyond plan, evaluate Dual Enrollment & Grant eligibility, track Senior Scholar progress, and develop your Capstone with AI-guided reflection."
          ),
          e("div", { style: { marginTop: "1rem", display: "flex", gap: "0.6rem", flexWrap: "wrap" } },
            e("span", { className: `badge ${db.currentUser.verifiedByEducator ? "badge-success" : "badge-warning"}` },
              db.currentUser.verifiedByEducator
                ? `✓ Academic Record Verified by ${db.currentUser.verifiedBy}`
                : "Pending Educator Verification"
            ),
            e("span", { className: "badge badge-navy" }, `Rule Engine: ${db.eligibilityRules.version}`)
          )
        ),
        e("img", { src: "./uhs-logo.jpg", alt: "UHS Tiger Logo", className: "hero-mascot" })
      ),

      // Key Academic & Grant Metrics Strip
      e("div", { className: "metrics-grid" },
        e("div", { className: "metric-card" },
          e("div", { className: "metric-label" },
            e("span", null, "Unweighted / Weighted GPA"),
            e("span", { className: "badge badge-success" }, "Verified")
          ),
          e("div", { className: "metric-value" }, `${db.academicRecords.unweightedGpa.toFixed(2)} / ${db.academicRecords.weightedGpa.toFixed(2)}`),
          e("div", { className: "metric-sub" }, "ACT Composite: ", e("strong", null, db.academicRecords.actComposite), ` (Eng ${db.academicRecords.actEnglish} · Math ${db.academicRecords.actMath} · Sci ${db.academicRecords.actScience})`)
        ),
        e("div", { className: "metric-card", onClick: () => setActiveTab("plan"), style: { cursor: "pointer" } },
          e("div", { className: "metric-label" },
            e("span", null, "Graduation Credits"),
            e("span", { className: "badge badge-warning" }, "1 Lab Sci Needed")
          ),
          e("div", { className: "metric-value" }, `${db.academicRecords.plannedCredits.toFixed(1)} / ${db.academicRecords.minimumCredits}`),
          e("div", { className: "metric-sub" }, "22-credit minimum · Science at 2.0 / 3.0")
        ),
        e("div", { className: "metric-card", onClick: () => setActiveTab("de_grant"), style: { cursor: "pointer" } },
          e("div", { className: "metric-label" },
            e("span", null, "TN Dual Enrollment Grant"),
            e("span", { className: "badge badge-navy" }, "10-Course Limit")
          ),
          e("div", { className: "metric-value" }, `${remainingGrantCourses} Remaining`),
          e("div", { className: "metric-sub" }, `${db.dualEnrollmentRecords.length} of 10 courses used/planned · 100% Tier 1 used`)
        ),
        e("div", { className: "metric-card", onClick: () => setActiveTab("scholar"), style: { cursor: "pointer" } },
          e("div", { className: "metric-label" },
            e("span", null, "Senior Scholar Status"),
            e("span", { className: "badge badge-warning" }, "Projected")
          ),
          e("div", { className: "metric-value" }, `${scholarEvalSim.metCount} / ${scholarEvalSim.totalCount} Met`),
          e("div", { className: "metric-sub" }, "Need +0.05 GPA, +1 ACT pt & 2 service hrs")
        )
      ),

      // Workspace Cards (Expanding the 01 PLAN / 02 CREATE / 03 ASK layout from Screenshot 3)
      e("div", { className: "section-header" },
        e("h2", null, "Your workspace"),
        e("span", { style: { fontSize: "0.84rem", color: "var(--text-muted)" } }, "Select a module to explore or test hypothetical scenarios")
      ),
      e("div", { className: "workspace-grid" },
        e("div", { className: "workspace-card", onClick: () => { setActiveTab("plan"); setPlanSubTab("four_year"); } },
          e("div", null,
            e("div", { className: "workspace-step" }, "01 · PLAN"),
            e("h3", null, "High School & Beyond Plan"),
            e("p", null, "Pathway & career direction, four-year graduation credit snapshot, and your annual counselor review.")
          ),
          e("span", { className: "workspace-link" }, "Open Pouncer's plan →")
        ),
        e("div", { className: "workspace-card", onClick: () => setActiveTab("de_grant") },
          e("div", null,
            e("div", { className: "workspace-step" }, "02 · CALCULATE & FUND"),
            e("h3", null, "DE Eligibility & TN Grant Tracker"),
            e("p", null, "Evaluate University of Memphis course subscore requirements, test hypothetical ACT/GPA scores, and track your 10-course TSAC grant.")
          ),
          e("span", { className: "workspace-link" }, "Open DE & Grant calculator →")
        ),
        e("div", { className: "workspace-card", onClick: () => setActiveTab("scholar") },
          e("div", null,
            e("div", { className: "workspace-step" }, "03 · TRACK HONORS"),
            e("h3", null, "Senior Scholar Progress Tracker"),
            e("p", null, "Monitor official UHS Senior Scholar benchmarks, distinguish projected vs. confirmed status, and run 'what-if' goal planning.")
          ),
          e("span", { className: "workspace-link" }, "Open Senior Scholar tracker →")
        ),
        e("div", { className: "workspace-card", onClick: () => setActiveTab("capstone_ai") },
          e("div", null,
            e("div", { className: "workspace-step" }, "04 · CREATE & REFLECT"),
            e("h3", null, "Capstone Proposal & AI Guide"),
            e("p", null, "Your basketball biomechanics project, work-based learning log, AI-recognized competencies, and grounded Program of Studies Q&A.")
          ),
          e("span", { className: "workspace-link" }, "Open Capstone & AI reflection →")
        )
      ),

      // Upcoming Milestones & Action Plan Preview
      e("div", { className: "card-panel" },
        e("div", { className: "card-panel-header" },
          e("div", null,
            e("h3", null, "Recommended Next Steps & Postsecondary Action Plan"),
            e("p", { style: { fontSize: "0.85rem", color: "var(--text-muted)" } }, "Generated by the deterministic Rule Engine and grounded AI Reflection Assistant")
          ),
          e("button", { className: "btn btn-outline", onClick: () => setActiveTab("capstone_ai") }, "Manage Action Plan →")
        ),
        e("table", { className: "data-table" },
          e("thead", null,
            e("tr", null,
              e("th", null, "Milestone / Action Item"),
              e("th", null, "Category"),
              e("th", null, "Target Date"),
              e("th", null, "Status")
            )
          ),
          e("tbody", null,
            db.actionPlans.map(item =>
              e("tr", { key: item.id },
                e("td", { style: { fontWeight: 600 } }, item.title),
                e("td", null, item.category),
                e("td", null, item.due),
                e("td", null,
                  e("span", {
                    className: `badge ${item.status === "Action Needed" ? "badge-danger" : item.status === "Almost Done" ? "badge-success" : "badge-navy"}`
                  }, item.status)
                )
              )
            )
          )
        )
      )
    );
  }

  // Render View 2: High School & Beyond Plan (Directly incorporates Screenshots 1 & 2!)
  function renderPlan() {
    const remainingToMin = Math.max(0, db.academicRecords.minimumCredits - db.academicRecords.plannedCredits).toFixed(1);

    return e("div", null,
      e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" } },
        e("div", null,
          e("h2", { style: { fontSize: "1.85rem", fontWeight: 800 } }, db.currentUser.name),
          e("p", { style: { color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1rem" } },
            `${db.currentUser.cohort} - Grade ${db.currentUser.grade} - ${db.currentUser.reviewStatus}`
          )
        ),
        e("span", { style: { fontWeight: 600, color: "var(--text-muted)" } }, "Planning")
      ),

      e("div", { className: "notice-banner" },
        e("span", null,
          e("strong", null, "Planning tool only: "),
          "Planned credits are not earned credits. PowerSchool remains the official graduation record."
        ),
        e("span", { className: "badge badge-navy" }, "2026–27 Catalog")
      ),

      // Exact 3 Sub-tabs from Screenshots 1 & 2
      e("div", { className: "sub-tabs" },
        e("button", {
          className: `sub-tab ${planSubTab === "profile" ? "active" : ""}`,
          onClick: () => setPlanSubTab("profile")
        }, "Planning profile"),
        e("button", {
          className: `sub-tab ${planSubTab === "four_year" ? "active" : ""}`,
          onClick: () => setPlanSubTab("four_year")
        }, "Four-year academic plan"),
        e("button", {
          className: `sub-tab ${planSubTab === "annual_review" ? "active" : ""}`,
          onClick: () => setPlanSubTab("annual_review")
        }, "Annual review")
      ),

      // Sub-tab 1: Planning profile (Matches Screenshot 2)
      planSubTab === "profile" && e("div", { className: "card-panel" },
        e("div", { className: "card-panel-header" },
          e("h3", null, "Pathway and career direction"),
          e("span", { className: "badge badge-success" }, "Auto-saved to Student Profile")
        ),
        e("div", { className: "grid-2" },
          e("div", { className: "form-group" },
            e("label", null, "UHS Pathway / Focus Area"),
            e("select", {
              className: "form-control",
              value: db.studentProfiles.pathway,
              onChange: ev => setDb(p => ({ ...p, studentProfiles: { ...p.studentProfiles, pathway: ev.target.value } }))
            },
              e("option", { value: "Sport & Human Performance" }, "Sport & Human Performance"),
              e("option", { value: "STEM & Biomedical Engineering" }, "STEM & Biomedical Engineering"),
              e("option", { value: "Humanities, Law & Public Policy" }, "Humanities, Law & Public Policy"),
              e("option", { value: "Visual & Performing Arts" }, "Visual & Performing Arts")
            )
          ),
          e("div", { className: "form-group" },
            e("label", null, "Postsecondary direction"),
            e("select", {
              className: "form-control",
              value: db.studentProfiles.postsecondaryDirection,
              onChange: ev => setDb(p => ({ ...p, studentProfiles: { ...p.studentProfiles, postsecondaryDirection: ev.target.value } }))
            },
              e("option", { value: "Four-year university" }, "Four-year university"),
              e("option", { value: "Two-year college / Associate pathway" }, "Two-year college / Associate pathway"),
              e("option", { value: "Technical certificate / Career readiness" }, "Technical certificate / Career readiness"),
              e("option", { value: "Military / Service academy" }, "Military / Service academy")
            )
          ),
          e("div", { className: "form-group" },
            e("label", null, "Possible major or field"),
            e("input", {
              type: "text",
              className: "form-control",
              value: db.studentProfiles.possibleMajor,
              onChange: ev => setDb(p => ({ ...p, studentProfiles: { ...p.studentProfiles, possibleMajor: ev.target.value } }))
            })
          ),
          e("div", { className: "form-group" },
            e("label", null, "Career interests"),
            e("textarea", {
              className: "form-control",
              value: db.studentProfiles.careerInterests,
              onChange: ev => setDb(p => ({ ...p, studentProfiles: { ...p.studentProfiles, careerInterests: ev.target.value } }))
            })
          )
        ),
        e("div", { className: "form-group" },
          e("label", null, "Postsecondary institutions or programs of interest"),
          e("textarea", {
            className: "form-control",
            value: db.studentProfiles.institutionsOfInterest,
            onChange: ev => setDb(p => ({ ...p, studentProfiles: { ...p.studentProfiles, institutionsOfInterest: ev.target.value } }))
          })
        )
      ),

      // Sub-tab 2: Four-year academic plan (Matches Screenshot 1)
      planSubTab === "four_year" && e("div", { className: "card-panel" },
        e("div", { className: "card-panel-header" },
          e("div", null,
            e("h3", null, "Graduation planning snapshot"),
            e("p", { style: { fontSize: "0.86rem", color: "var(--text-muted)", marginTop: "0.2rem" } },
              "22-credit minimum for the Class of 2027; Computer Science is not required."
            )
          ),
          e("span", { className: "badge badge-navy" }, "2026-27 catalog")
        ),
        e("div", { className: "metrics-grid", style: { marginTop: "0.75rem", marginBottom: "1rem" } },
          e("div", { className: "metric-card" },
            e("div", { className: "metric-label" }, "Planned credits"),
            e("div", { className: "metric-value" }, db.academicRecords.plannedCredits.toFixed(1))
          ),
          e("div", { className: "metric-card" },
            e("div", { className: "metric-label" }, "Minimum"),
            e("div", { className: "metric-value" }, db.academicRecords.minimumCredits)
          ),
          e("div", { className: "metric-card" },
            e("div", { className: "metric-label" }, "Courses planned"),
            e("div", { className: "metric-value" }, db.academicRecords.coursesPlanned)
          ),
          e("div", { className: "metric-card" },
            e("div", { className: "metric-label" }, "Remaining to minimum"),
            e("div", { className: "metric-value" }, remainingToMin)
          )
        ),
        e("div", { className: "credit-rows" },
          db.academicRecords.creditsBySubject.map((item, idx) => {
            const isComplete = item.earned >= item.required;
            return e("div", { key: idx, className: "credit-row" },
              e("div", null,
                e("span", { style: { fontWeight: 600 } }, item.subject),
                item.note && e("div", { style: { fontSize: "0.78rem", color: "var(--warning)" } }, item.note)
              ),
              e("span", { className: `credit-score ${isComplete ? "complete" : "incomplete"}` },
                `${item.earned.toFixed(1)} / ${item.required}`
              )
            );
          })
        )
      ),

      // Sub-tab 3: Annual review & Academic Profile Editor
      planSubTab === "annual_review" && e("div", { className: "card-panel" },
        e("div", { className: "card-panel-header" },
          e("div", null,
            e("h3", null, "Student Academic Profile & Annual Counselor Review"),
            e("p", { style: { fontSize: "0.86rem", color: "var(--text-muted)" } },
              "Editable student academic records with optional Educator Verification (Core Feature 2.A)."
            )
          ),
          e("span", { className: `badge ${db.currentUser.verifiedByEducator ? "badge-success" : "badge-warning"}` },
            db.currentUser.verifiedByEducator ? `Verified (${db.currentUser.verifiedDate})` : "Unverified — Pending Review"
          )
        ),
        e("div", { className: "grid-3" },
          e("div", { className: "form-group" },
            e("label", null, "Unweighted GPA (4.0 scale)"),
            e("input", {
              type: "number",
              step: "0.01",
              min: "0",
              max: "4.0",
              className: "form-control",
              value: db.academicRecords.unweightedGpa,
              onChange: ev => {
                const val = parseFloat(ev.target.value) || 0;
                setDb(p => ({
                  ...p,
                  currentUser: { ...p.currentUser, verifiedByEducator: false },
                  academicRecords: { ...p.academicRecords, unweightedGpa: val }
                }));
                setSimGpa(val);
              }
            })
          ),
          e("div", { className: "form-group" },
            e("label", null, "ACT Composite Score"),
            e("input", {
              type: "number",
              min: "1",
              max: "36",
              className: "form-control",
              value: db.academicRecords.actComposite,
              onChange: ev => {
                const val = parseInt(ev.target.value, 10) || 1;
                setDb(p => ({
                  ...p,
                  currentUser: { ...p.currentUser, verifiedByEducator: false },
                  academicRecords: { ...p.academicRecords, actComposite: val }
                }));
                setSimActComp(val);
              }
            })
          ),
          e("div", { className: "form-group" },
            e("label", null, "ACT English / Math / Science Subscores"),
            e("div", { style: { display: "flex", gap: "0.4rem" } },
              e("input", {
                type: "number",
                className: "form-control",
                title: "ACT English",
                value: db.academicRecords.actEnglish,
                onChange: ev => {
                  const val = parseInt(ev.target.value, 10) || 1;
                  setDb(p => ({ ...p, academicRecords: { ...p.academicRecords, actEnglish: val } }));
                  setSimActEng(val);
                }
              }),
              e("input", {
                type: "number",
                className: "form-control",
                title: "ACT Math",
                value: db.academicRecords.actMath,
                onChange: ev => {
                  const val = parseInt(ev.target.value, 10) || 1;
                  setDb(p => ({ ...p, academicRecords: { ...p.academicRecords, actMath: val } }));
                  setSimActMath(val);
                }
              }),
              e("input", {
                type: "number",
                className: "form-control",
                title: "ACT Science",
                value: db.academicRecords.actScience,
                onChange: ev => {
                  const val = parseInt(ev.target.value, 10) || 1;
                  setDb(p => ({ ...p, academicRecords: { ...p.academicRecords, actScience: val } }));
                  setSimActSci(val);
                }
              })
            )
          )
        ),
        e("p", { style: { fontSize: "0.83rem", color: "var(--text-muted)", marginTop: "0.5rem" } },
          "Note: Editing official GPA or ACT scores marks the record as 'Pending Educator Verification' until confirmed by a UHS counselor."
        )
      )
    );
  }

  // Render View 3: Dual Enrollment Eligibility Calculator & TN Dual Enrollment Grant Tracker (Core Features 2.C & 2.D)
  function renderDeAndGrant() {
    const usedCount = db.dualEnrollmentRecords.length;
    const remainingCount = Math.max(0, 10 - usedCount);

    return e("div", null,
      e("div", { className: "section-header" },
        e("div", null,
          e("h2", { style: { fontSize: "1.6rem" } }, "Dual Enrollment Eligibility Calculator & TN Grant Tracker"),
          e("p", { style: { color: "var(--text-muted)", fontSize: "0.92rem" } },
            "Deterministic rule engine separating University of Memphis admission eligibility from Tennessee Dual Enrollment Grant (TSAC) eligibility."
          )
        ),
        isHypothetical && e("button", { className: "btn btn-outline", onClick: syncSandboxToActual }, "Reset to Official Record")
      ),

      // Interactive "What-If" Score Sandbox
      e("div", { className: "card-panel" },
        e("div", { className: "card-panel-header" },
          e("div", null,
            e("h3", null, "Interactive Eligibility Sandbox (Experiment with Hypothetical Scores)"),
            e("p", { style: { fontSize: "0.84rem", color: "var(--text-muted)" } },
              `Audited Rule Version: ${db.eligibilityRules.version} · Source: ${db.eligibilityRules.sourceReference}`
            )
          ),
          e("span", { className: `badge ${isHypothetical ? "badge-warning" : "badge-success"}` },
            isHypothetical ? "Hypothetical What-If Mode Active" : "Showing Official Student Scores"
          )
        ),
        e("div", { className: "grid-3" },
          e("div", { className: "form-group" },
            e("label", null, `Unweighted GPA: ${Number(simGpa).toFixed(2)} (Official: ${db.academicRecords.unweightedGpa})`),
            e("input", {
              type: "range",
              min: "2.0",
              max: "4.0",
              step: "0.05",
              value: simGpa,
              onChange: ev => setSimGpa(parseFloat(ev.target.value))
            })
          ),
          e("div", { className: "form-group" },
            e("label", null, `ACT Composite: ${simActComp} (Official: ${db.academicRecords.actComposite})`),
            e("input", {
              type: "range",
              min: "14",
              max: "36",
              step: "1",
              value: simActComp,
              onChange: ev => setSimActComp(parseInt(ev.target.value, 10))
            })
          ),
          e("div", { className: "form-group" },
            e("label", null, `ACT English Subscore: ${simActEng} (Official: ${db.academicRecords.actEnglish})`),
            e("input", {
              type: "range",
              min: "12",
              max: "36",
              step: "1",
              value: simActEng,
              onChange: ev => setSimActEng(parseInt(ev.target.value, 10))
            })
          ),
          e("div", { className: "form-group" },
            e("label", null, `ACT Math Subscore: ${simActMath} (Official: ${db.academicRecords.actMath})`),
            e("input", {
              type: "range",
              min: "12",
              max: "36",
              step: "1",
              value: simActMath,
              onChange: ev => setSimActMath(parseInt(ev.target.value, 10))
            })
          ),
          e("div", { className: "form-group" },
            e("label", null, `ACT Science Subscore: ${simActSci} (Official: ${db.academicRecords.actScience})`),
            e("input", {
              type: "range",
              min: "12",
              max: "36",
              step: "1",
              value: simActSci,
              onChange: ev => setSimActSci(parseInt(ev.target.value, 10))
            })
          )
        ),

        // Side-by-side distinction: University Admission vs. Tennessee TSAC Grant Eligibility
        e("div", { className: "grid-2", style: { marginTop: "0.75rem" } },
          e("div", { style: { padding: "1.1rem", borderRadius: "10px", border: "1px solid var(--border-color)", background: "#f8fafc" } },
            e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" } },
              e("strong", null, "1. University Dual Enrollment Admission"),
              e("span", { className: `badge ${deEvalSim.generalAdmissionEligible ? "badge-success" : "badge-danger"}` },
                deEvalSim.generalAdmissionEligible ? "✓ Eligible for Admission" : "✗ Missing Benchmark"
              )
            ),
            e("p", { style: { fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem" } },
              `Requires ${db.eligibilityRules.generalDeMinGpa.toFixed(2)}+ GPA & ${db.eligibilityRules.generalDeMinActComposite}+ ACT Composite OR Admission Index ≥ ${db.eligibilityRules.admissionIndexTarget}.`
            ),
            e("div", { style: { fontSize: "0.84rem" } },
              e("div", null, "• Current Admission Index (GPA×20 + ACT): ", e("strong", null, deEvalSim.actualIndex), ` (Target: ${db.eligibilityRules.admissionIndexTarget})`),
              e("div", null, `• At ${Number(simGpa).toFixed(2)} GPA, minimum ACT needed for Index: `, e("strong", null, `${deEvalSim.minActForIndex} ACT`)),
              e("div", null, `• At ${simActComp} ACT, minimum GPA needed for Index: `, e("strong", null, `${deEvalSim.minGpaForIndex} GPA`))
            )
          ),
          e("div", { style: { padding: "1.1rem", borderRadius: "10px", border: "1px solid var(--border-color)", background: "#f8fafc" } },
            e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" } },
              e("strong", null, "2. Tennessee Dual Enrollment Grant (TSAC)"),
              e("span", { className: `badge ${deEvalSim.tsacGrantEligible ? "badge-success" : "badge-danger"}` },
                deEvalSim.tsacGrantEligible ? "✓ Grant Eligible" : "✗ Below Grant GPA"
              )
            ),
            e("p", { style: { fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem" } },
              `State grant eligibility is evaluated separately from university admission (Requires ${db.eligibilityRules.tsacMinGpa.toFixed(2)}+ cumulative HS GPA & TN residency).`
            ),
            e("div", { style: { fontSize: "0.84rem" } },
              e("div", null, "• Courses 1–5: ", e("strong", null, "100% Tuition Covered ($540 / course)"), " — $0 out-of-pocket"),
              e("div", null, "• Courses 6–10: ", e("strong", null, "$100 / credit hour ($300 / course)"), " — requires 3.0 DE college GPA")
            )
          )
        )
      ),

      // Course-specific subscore table
      e("div", { className: "card-panel" },
        e("div", { className: "card-panel-header" },
          e("h3", null, "Course-Specific Prerequisite & ACT Subscore Evaluation"),
          e("span", { className: "badge badge-navy" }, "English, Math & Science Subscores")
        ),
        e("table", { className: "data-table" },
          e("thead", null,
            e("tr", null,
              e("th", null, "Course"),
              e("th", null, "Min GPA / ACT Comp"),
              e("th", null, "Required Subscore"),
              e("th", null, "Your Subscore"),
              e("th", null, "Eligibility & Explanation")
            )
          ),
          e("tbody", null,
            deEvalSim.courseEvaluations.map(c =>
              e("tr", { key: c.id },
                e("td", null, e("strong", null, c.code), " — ", c.title),
                e("td", null, `${c.minGpa.toFixed(1)} GPA / ${c.minActComposite} ACT`),
                e("td", null, `${c.subscoreLabel} ≥ ${c.minSubscore}`),
                e("td", { style: { fontWeight: 700 } }, c.currentSubscore),
                e("td", null,
                  c.eligible
                    ? e("span", { className: "badge badge-success" }, "✓ Satisfied — Eligible to Enroll")
                    : e("div", null,
                        e("span", { className: "badge badge-danger", style: { marginBottom: "0.25rem" } }, "Missing Prerequisite"),
                        e("div", { style: { fontSize: "0.8rem", color: "var(--danger)" } }, c.missingReasons.join("; "))
                      )
                )
              )
            )
          )
        )
      ),

      // Section 2.D: Tennessee Dual Enrollment Grant Tracker (10-course limit)
      e("div", { className: "card-panel" },
        e("div", { className: "card-panel-header" },
          e("div", null,
            e("h3", null, "Tennessee Dual Enrollment Grant Tracker (10-Course Lifetime Limit)"),
            e("p", { style: { fontSize: "0.85rem", color: "var(--text-muted)" } },
              `You have used or planned ${usedCount} of your 10 lifetime grant-supported courses (${remainingCount} grant courses remaining).`
            )
          ),
          e("span", { className: "badge badge-success" }, `${remainingCount} of 10 Courses Remaining`)
        ),
        e("div", { className: "progress-track" },
          e("div", { className: "progress-fill", style: { width: `${(usedCount / 10) * 100}%` } })
        ),
        e("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "1rem" } },
          e("span", null, "Courses 1–5: Full Tuition Grant Tier (5 / 5 Planned)"),
          e("span", null, "Courses 6–10: $300/Course Grant Tier (5 Remaining)")
        ),
        e("table", { className: "data-table" },
          e("thead", null,
            e("tr", null,
              e("th", null, "Grant Slot"),
              e("th", null, "Term"),
              e("th", null, "Course"),
              e("th", null, "Status / Grade"),
              e("th", null, "TSAC Grant Coverage")
            )
          ),
          e("tbody", null,
            db.dualEnrollmentRecords.map(rec =>
              e("tr", { key: rec.id },
                e("td", null, e("strong", null, `Course #${rec.courseNum} of 10`)),
                e("td", null, rec.term),
                e("td", null, `${rec.code}: ${rec.title} (${rec.credits} cr)`),
                e("td", null, e("span", { className: "badge badge-navy" }, `${rec.status} (${rec.grade})`)),
                e("td", { style: { color: "var(--success)", fontWeight: 600 } }, rec.grantTier)
              )
            )
          )
        )
      )
    );
  }

  // Render View 4: Senior Scholar Status Tracker (Core Feature 2.E)
  function renderSeniorScholar() {
    return e("div", null,
      e("div", { className: "section-header" },
        e("div", null,
          e("h2", { style: { fontSize: "1.6rem" } }, "UHS Senior Scholar Status Tracker"),
          e("p", { style: { color: "var(--text-muted)", fontSize: "0.92rem" } },
            "Track approved Senior Scholar designation requirements and model what you need to achieve before graduation."
          )
        ),
        e("span", { className: "badge badge-warning", style: { fontSize: "0.85rem", padding: "0.4rem 0.85rem" } },
          `Official Status: ${db.scholarRequirements.officialConfirmationStatus}`
        )
      ),

      // Distinction banner between Projected Eligibility vs Officially Confirmed Status
      e("div", { className: "notice-banner" },
        e("div", null,
          e("strong", null, "Projected Eligibility vs. Official Confirmation: "),
          "This tracker calculates your projected Senior Scholar eligibility based on current and hypothetical records. Official Senior Scholar designation is confirmed by the UHS Counseling Office after 7th-semester transcripts and Capstone defense."
        )
      ),

      // Hypothetical planner for Senior Scholar
      e("div", { className: "card-panel" },
        e("div", { className: "card-panel-header" },
          e("h3", null, "Hypothetical Goal Planner — Test What You Need for Senior Scholar"),
          e("span", { className: `badge ${scholarEvalSim.allMet ? "badge-success" : "badge-warning"}` },
            scholarEvalSim.allMet
              ? "★ All 5 Senior Scholar Benchmarks Projected Met!"
              : `${scholarEvalSim.metCount} of ${scholarEvalSim.totalCount} Benchmarks Currently Satisfied`
          )
        ),
        e("div", { className: "grid-2" },
          e("div", { className: "form-group" },
            e("label", null, `Projected Unweighted GPA: ${Number(simGpa).toFixed(2)} (Required: ${db.scholarRequirements.minGpa.toFixed(2)}+)`),
            e("input", {
              type: "range",
              min: "2.5",
              max: "4.0",
              step: "0.05",
              value: simGpa,
              onChange: ev => setSimGpa(parseFloat(ev.target.value))
            })
          ),
          e("div", { className: "form-group" },
            e("label", null, `Projected ACT Composite: ${simActComp} (Required: ${db.scholarRequirements.minAct}+)`),
            e("input", {
              type: "range",
              min: "16",
              max: "36",
              step: "1",
              value: simActComp,
              onChange: ev => setSimActComp(parseInt(ev.target.value, 10))
            })
          ),
          e("div", { className: "form-group" },
            e("label", null, `Verified Community Service Hours: ${simService} hrs (Required: ${db.scholarRequirements.minServiceHours} hrs)`),
            e("input", {
              type: "range",
              min: "0",
              max: "100",
              step: "2",
              value: simService,
              onChange: ev => setSimService(parseInt(ev.target.value, 10))
            })
          ),
          e("div", { className: "form-group" },
            e("label", null, `Dual Enrollment Courses Completed/Planned: ${simDeCount} (Required: ${db.scholarRequirements.minDeCourses}+)`),
            e("input", {
              type: "range",
              min: "0",
              max: "10",
              step: "1",
              value: simDeCount,
              onChange: ev => setSimDeCount(parseInt(ev.target.value, 10))
            })
          )
        ),

        e("table", { className: "data-table", style: { marginTop: "1rem" } },
          e("thead", null,
            e("tr", null,
              e("th", null, "Senior Scholar Requirement"),
              e("th", null, "Your Current / Projected"),
              e("th", null, "UHS Standard"),
              e("th", null, "Status & Remaining Action Needed")
            )
          ),
          e("tbody", null,
            scholarEvalSim.checks.map((chk, idx) =>
              e("tr", { key: idx },
                e("td", { style: { fontWeight: 600 } }, chk.label),
                e("td", null, chk.current),
                e("td", null, chk.target),
                e("td", null,
                  chk.met
                    ? e("span", { className: "badge badge-success" }, `✓ ${chk.gap}`)
                    : e("span", { className: "badge badge-danger" }, `Outstanding: ${chk.gap}`)
                )
              )
            )
          )
        )
      )
    );
  }

  // Render View 5: Capstone Proposal, Experience Tracking & AI-Guided Reflection (Core Features 2.B & 2.F)
  function renderCapstoneAndAi() {
    return e("div", null,
      e("div", { className: "section-header" },
        e("div", null,
          e("h2", { style: { fontSize: "1.6rem" } }, "Capstone Proposal & AI-Guided Reflection"),
          e("p", { style: { color: "var(--text-muted)", fontSize: "0.92rem" } },
            "Develop your Senior Capstone, log internships & work-based learning, review AI-recognized competencies, and ask the Program of Studies guide."
          )
        )
      ),

      e("div", { className: "grid-2" },
        // Left Column: Capstone Proposal Draft + Experience Log
        e("div", null,
          e("div", { className: "card-panel" },
            e("div", { className: "card-panel-header" },
              e("h3", null, "02 · CREATE — Capstone Proposal Draft"),
              e("span", { className: "badge badge-navy" }, "Sport & Human Performance")
            ),
            e("div", { className: "form-group" },
              e("label", null, "Capstone Project Title"),
              e("input", {
                type: "text",
                className: "form-control",
                value: db.studentProfiles.capstoneTitle,
                onChange: ev => setDb(p => ({ ...p, studentProfiles: { ...p.studentProfiles, capstoneTitle: ev.target.value } }))
              })
            ),
            e("div", { className: "form-group" },
              e("label", null, "Project Scope, Goals & Community Impact"),
              e("textarea", {
                className: "form-control",
                value: db.studentProfiles.capstoneSummary,
                onChange: ev => setDb(p => ({ ...p, studentProfiles: { ...p.studentProfiles, capstoneSummary: ev.target.value } }))
              })
            )
          ),

          // Competency Recognition (Student review & correction of AI-generated interpretations)
          e("div", { className: "card-panel" },
            e("div", { className: "card-panel-header" },
              e("div", null,
                e("h3", null, "AI-Recognized Strengths & Competencies"),
                e("p", { style: { fontSize: "0.82rem", color: "var(--text-muted)" } },
                  "Review and edit AI-generated interpretations of your recurring skills (Feature 2.B)."
                )
              )
            ),
            db.competencies.map(comp =>
              e("div", {
                key: comp.id,
                style: { padding: "0.85rem", border: "1px solid var(--border-color)", borderRadius: "8px", marginBottom: "0.75rem", background: "#f8fafc" }
              },
                e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" } },
                  e("strong", null, comp.name),
                  e("span", { className: "badge badge-success" }, comp.confidence)
                ),
                e("textarea", {
                  className: "form-control",
                  style: { minHeight: "62px", fontSize: "0.84rem" },
                  value: comp.aiInterpretation,
                  onChange: ev => {
                    const val = ev.target.value;
                    setDb(p => ({
                      ...p,
                      competencies: p.competencies.map(c => c.id === comp.id ? { ...c, aiInterpretation: val } : c)
                    }));
                  }
                })
              )
            )
          )
        ),

        // Right Column: AI-Guided Reflection Conversation & Program of Studies Q&A
        e("div", null,
          e("div", { className: "card-panel" },
            e("div", { className: "card-panel-header" },
              e("div", null,
                e("h3", null, "03 · ASK — AI Reflection & Program of Studies Guide"),
                e("p", { style: { fontSize: "0.82rem", color: "var(--text-muted)" } },
                  "Grounded in school-approved UHS resources. Official eligibility is computed by the Rule Engine."
                )
              ),
              e("span", { className: "badge badge-navy" }, "Grounded AI")
            ),
            e("div", { className: "chat-window" },
              db.conversations.map((msg, i) =>
                e("div", { key: i, className: `chat-msg ${msg.sender}` },
                  e("div", { className: "chat-sender" }, msg.sender === "ai" ? "Tiger Navigator Guide (AI + Rule Engine)" : "Pouncer (Student)"),
                  e("div", { style: { whiteSpace: "pre-line" } }, msg.text)
                )
              )
            ),
            e("div", { style: { display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "0.75rem" } },
              [
                "How do I qualify for DE College Algebra (MATH 1710)?",
                "What do I still need for Senior Scholar status?",
                "Connect my Lab shadowing to my Capstone proposal"
              ].map((q, idx) =>
                e("button", {
                  key: idx,
                  className: "btn btn-subtle",
                  style: { fontSize: "0.76rem", padding: "0.35rem 0.65rem" },
                  onClick: () => handleSendChat(q)
                }, q)
              )
            ),
            e("div", { style: { display: "flex", gap: "0.5rem" } },
              e("input", {
                type: "text",
                className: "form-control",
                placeholder: "Reflect on an experience or ask about UHS courses, pathways, or grants...",
                value: chatInput,
                onChange: ev => setChatInput(ev.target.value),
                onKeyDown: ev => { if (ev.key === "Enter") handleSendChat(); }
              }),
              e("button", { className: "btn btn-primary", onClick: () => handleSendChat() }, "Send")
            )
          ),

          // Experience Log & Add New Experience
          e("div", { className: "card-panel" },
            e("div", { className: "card-panel-header" },
              e("h3", null, "Coursework, Internships & Work-Based Learning Log"),
              e("span", { className: "badge badge-navy" }, `${db.experiences.length} Logged`)
            ),
            db.experiences.map(exp =>
              e("div", {
                key: exp.id,
                style: { borderBottom: "1px solid var(--border-color)", paddingBottom: "0.85rem", marginBottom: "0.85rem" }
              },
                e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                  e("strong", { style: { fontSize: "0.94rem" } }, exp.title),
                  e("span", { className: "badge badge-navy" }, `${exp.hours} hrs · ${exp.type}`)
                ),
                e("p", { style: { fontSize: "0.84rem", color: "var(--text-muted)", margin: "0.35rem 0" } }, exp.reflection),
                e("div", { style: { display: "flex", gap: "0.35rem", flexWrap: "wrap" } },
                  exp.competencies.map((tag, i) =>
                    e("span", { key: i, className: "badge badge-success" }, tag)
                  )
                )
              )
            ),
            e("form", { onSubmit: handleAddExperience, style: { marginTop: "1rem", paddingTop: "0.75rem" } },
              e("h4", { style: { fontSize: "0.92rem", marginBottom: "0.6rem" } }, "+ Log New Experience or Capstone Activity"),
              e("div", { className: "grid-2" },
                e("input", {
                  type: "text",
                  className: "form-control",
                  placeholder: "Activity or Internship Title...",
                  value: newExpTitle,
                  onChange: ev => setNewExpTitle(ev.target.value)
                }),
                e("select", {
                  className: "form-control",
                  value: newExpType,
                  onChange: ev => setNewExpType(ev.target.value)
                },
                  e("option", { value: "Capstone Activity" }, "Capstone Activity"),
                  e("option", { value: "Internship / Work-Based Learning" }, "Internship / Work-Based Learning"),
                  e("option", { value: "Community Service" }, "Community Service (Counts toward Senior Scholar)")
                )
              ),
              e("textarea", {
                className: "form-control",
                style: { marginTop: "0.6rem", minHeight: "65px" },
                placeholder: "What did you learn or accomplish during this experience?",
                value: newExpReflection,
                onChange: ev => setNewExpReflection(ev.target.value)
              }),
              e("button", { type: "submit", className: "btn btn-primary", style: { marginTop: "0.6rem" } }, "Save Experience & Extract Competencies")
            )
          )
        )
      )
    );
  }

  // Render View 6: Educator & Administrator Dashboard (Core Feature 2.G & Section 4 MongoDB Schema Inspector)
  function renderEducatorAdmin() {
    return e("div", null,
      e("div", { className: "section-header" },
        e("div", null,
          e("h2", { style: { fontSize: "1.6rem" } }, "Educator & Administrator Dashboard"),
          e("p", { style: { color: "var(--text-muted)", fontSize: "0.92rem" } },
            "Manage configurable academic eligibility rules without modifying code, verify student records, and oversee approved AI knowledge resources (Feature 2.G)."
          )
        ),
        e("span", { className: "badge badge-navy" }, "Role-Based Access: Educator / Counselor")
      ),

      e("div", { className: "grid-2" },
        // Configurable Eligibility Rules Manager
        e("div", { className: "card-panel" },
          e("div", { className: "card-panel-header" },
            e("div", null,
              e("h3", null, "Configurable Eligibility Rules Engine"),
              e("p", { style: { fontSize: "0.82rem", color: "var(--text-muted)" } },
                "Changes immediately update the Dual Enrollment & Senior Scholar calculators across the platform."
              )
            ),
            e("span", { className: "badge badge-success" }, db.eligibilityRules.version)
          ),
          e("div", { className: "grid-2" },
            e("div", { className: "form-group" },
              e("label", null, "UofM General DE Min GPA"),
              e("input", {
                type: "number",
                step: "0.05",
                className: "form-control",
                value: db.eligibilityRules.generalDeMinGpa,
                onChange: ev => setDb(p => ({
                  ...p,
                  eligibilityRules: { ...p.eligibilityRules, generalDeMinGpa: parseFloat(ev.target.value) || 3.0 }
                }))
              })
            ),
            e("div", { className: "form-group" },
              e("label", null, "TSAC Grant Min GPA"),
              e("input", {
                type: "number",
                step: "0.05",
                className: "form-control",
                value: db.eligibilityRules.tsacMinGpa,
                onChange: ev => setDb(p => ({
                  ...p,
                  eligibilityRules: { ...p.eligibilityRules, tsacMinGpa: parseFloat(ev.target.value) || 2.75 }
                }))
              })
            ),
            e("div", { className: "form-group" },
              e("label", null, "Senior Scholar Min GPA"),
              e("input", {
                type: "number",
                step: "0.05",
                className: "form-control",
                value: db.scholarRequirements.minGpa,
                onChange: ev => setDb(p => ({
                  ...p,
                  scholarRequirements: { ...p.scholarRequirements, minGpa: parseFloat(ev.target.value) || 3.5 }
                }))
              })
            ),
            e("div", { className: "form-group" },
              e("label", null, "Senior Scholar Min ACT Composite"),
              e("input", {
                type: "number",
                className: "form-control",
                value: db.scholarRequirements.minAct,
                onChange: ev => setDb(p => ({
                  ...p,
                  scholarRequirements: { ...p.scholarRequirements, minAct: parseInt(ev.target.value, 10) || 23 }
                }))
              })
            )
          ),
          e("p", { style: { fontSize: "0.8rem", color: "var(--text-muted)" } },
            `Audit Metadata: Source: ${db.eligibilityRules.sourceReference} · Last Updated: ${db.eligibilityRules.lastUpdated}`
          )
        ),

        // Educator Verification & Student Approval Panel
        e("div", { className: "card-panel" },
          e("div", { className: "card-panel-header" },
            e("h3", null, "Student Record & Senior Scholar Verification"),
            e("span", { className: `badge ${db.currentUser.verifiedByEducator ? "badge-success" : "badge-warning"}` },
              db.currentUser.verifiedByEducator ? "Verified" : "Needs Verification"
            )
          ),
          e("p", { style: { fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1rem" } },
            `Student: Pouncer (${db.currentUser.cohort}) · Unweighted GPA: ${db.academicRecords.unweightedGpa} · ACT Composite: ${db.academicRecords.actComposite} · Service Hours: ${db.academicRecords.serviceHours}`
          ),
          e("div", { style: { display: "flex", gap: "0.65rem", flexWrap: "wrap", marginBottom: "1.2rem" } },
            e("button", {
              className: "btn btn-primary",
              onClick: () => {
                setDb(p => ({
                  ...p,
                  currentUser: {
                    ...p.currentUser,
                    verifiedByEducator: true,
                    verifiedDate: "Nov 11, 2026",
                    verifiedBy: "Dr. M. Carter (UHS Academic Counselor)"
                  }
                }));
                showNotification("Student academic profile officially verified!");
              }
            }, "✓ Verify Student GPA & ACT Record"),
            e("button", {
              className: "btn btn-outline",
              onClick: () => {
                setDb(p => ({
                  ...p,
                  scholarRequirements: {
                    ...p.scholarRequirements,
                    officialConfirmationStatus: "Officially Confirmed by UHS Counseling Office"
                  }
                }));
                showNotification("Senior Scholar status marked as Officially Confirmed!");
              }
            }, "★ Confirm Official Senior Scholar Designation")
          ),
          e("h4", { style: { fontSize: "0.92rem", marginBottom: "0.5rem" } }, "School-Approved AI Knowledge Resources"),
          db.resources.map(res =>
            e("div", { key: res.id, style: { fontSize: "0.83rem", padding: "0.45rem 0", borderBottom: "1px solid var(--border-color)" } },
              e("strong", null, res.title), ` (${res.category}) — `, e("span", { style: { color: "var(--text-muted)" } }, res.summary)
            )
          )
        )
      ),

      // Technical Architecture & 12 MongoDB Collections Live Preview for Grant Reviewers
      e("div", { className: "card-panel" },
        e("div", { className: "card-panel-header" },
          e("div", null,
            e("h3", null, "Grant Technical Architecture — 12 MongoDB Collections Live State"),
            e("p", { style: { fontSize: "0.84rem", color: "var(--text-muted)" } },
              "Demonstrates how the Meteor.js + React + MongoDB collections specified in Section 4 of the Implementation Plan are structured."
            )
          ),
          e("span", { className: "badge badge-navy" }, "Meteor.js + React + MongoDB Schema")
        ),
        e("div", { className: "grid-3" },
          [
            { col: "users", desc: "Authentication & role-based access (Student / Educator)" },
            { col: "studentProfiles", desc: `Pathway: ${db.studentProfiles.pathway}` },
            { col: "academicRecords", desc: `GPA ${db.academicRecords.unweightedGpa}, ACT ${db.academicRecords.actComposite}, 25.0 credits` },
            { col: "experiences", desc: `${db.experiences.length} work-based & service records logged` },
            { col: "reflections", desc: "Structured student reflection narratives" },
            { col: "conversations", desc: `${db.conversations.length} grounded AI reflection messages` },
            { col: "competencies", desc: `${db.competencies.length} recognized strengths & evidence` },
            { col: "actionPlans", desc: `${db.actionPlans.length} postsecondary milestones tracked` },
            { col: "dualEnrollmentRecords", desc: `${db.dualEnrollmentRecords.length} of 10 TSAC grant courses tracked` },
            { col: "eligibilityRules", desc: `Audited rule engine (${db.eligibilityRules.version})` },
            { col: "scholarRequirements", desc: `UHS Senior Scholar rubric (${db.scholarRequirements.minGpa} GPA / ${db.scholarRequirements.minAct} ACT)` },
            { col: "resources & feedback", desc: `${db.resources.length} school-approved AI grounding documents` }
          ].map(c =>
            e("div", {
              key: c.col,
              style: { padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)", background: "#f8fafc" }
            },
              e("code", { style: { color: "var(--success)", fontWeight: 700, fontSize: "0.86rem" } }, c.col),
              e("div", { style: { fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" } }, c.desc)
            )
          )
        )
      )
    );
  }

  return e("div", null,
    header,
    toast && e("div", {
      style: {
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        background: "var(--uhs-navy-dark)",
        color: "#fff",
        padding: "0.75rem 1.25rem",
        borderRadius: "10px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        zIndex: 999,
        fontWeight: 600,
        fontSize: "0.88rem"
      }
    }, toast),
    e("main", { className: "main-container" },
      activeTab === "home" && renderHome(),
      activeTab === "plan" && renderPlan(),
      activeTab === "de_grant" && renderDeAndGrant(),
      activeTab === "scholar" && renderSeniorScholar(),
      activeTab === "capstone_ai" && renderCapstoneAndAi(),
      activeTab === "educator" && renderEducatorAdmin(),

      // Demo Footer (Matches Screenshot 3 disclaimer + Reset button)
      e("footer", { className: "demo-footer" },
        e("div", null,
          e("span", { className: "badge badge-navy", style: { marginRight: "0.5rem" } }, "DEMO"),
          "Pouncer is fictional. The planning, calculator, and proposal pages save rehearsal edits in this browser. Consult a UHS advisor for official graduation and grant decisions."
        ),
        e("button", { className: "btn btn-subtle", onClick: resetDemoData }, "Reset Demo Data")
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(TigerNavigatorApp));

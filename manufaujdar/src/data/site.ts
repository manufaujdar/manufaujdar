export const links = {
	linkedin: 'https://www.linkedin.com/in/drmanufaujdar/',
	github: 'https://github.com/manufaujdar',
	email: 'mailto:manu@healthunited.in',
};

export const experience = [
	{
		year: '2026 to present',
		title: 'Kasturba Medical College, Mangalore',
		role: 'House Surgeon',
		copy: 'Clinical work following medical training, within routine patient-care and hospital workflows.',
	},
	{
		year: '2025 to present',
		title: 'Master LLM',
    role: 'Founder and CEO',
		copy: 'A stealth startup building reliable local AI infrastructure for regulated industries.',
	},
	{
		year: '2022 to present',
		title: 'Health United Private Limited',
    role: 'Founder and CEO',
		copy: 'A health-tech startup developing robotic and automation infrastructure for hospital clinical workflows.',
	},
	{
		year: '2019',
		title: 'Petraion S.E.R.O.',
		role: 'Founder and CEO',
    copy: 'Research organization to study neuromodulation and neuroplasticity in young adults.',
	},
];

export const education = {
	year: '2021',
	 title: 'Kasturba Medical College, Mangalore',
	 role: 'Medical training, 2021 cohort',
	 copy: 'Medical training in Mangalore, with a foundation in clinical medicine, biomedical science, patient care, and clinical research.',
};

export const practiceAreas = [
	{
		title: 'Clinical context',
		copy: 'I begin with the people, handoffs, and constraints that shape a real health problem.',
	},
	{
		title: 'Research and evaluation',
		copy: 'I turn broad questions into studyable questions, clear measures, and claims the evidence can carry.',
	},
	{
		title: 'Reliable systems',
		copy: 'I build prototypes with explicit privacy boundaries, repeatable tests, and failure behavior another team can inspect.',
	},
];

export const proofPoints = [
	{
		label: 'Clinical workflow',
		copy: 'I translate clinical needs into intended users, workflow states, handoffs, escalation boundaries, and safe-stop behavior.',
	},
	{
		label: 'Health-tech framing',
		copy: 'I turn an early health-tech idea into a clearer brief: intended use, product requirements, data boundaries, risks, and the next validation gate.',
	},
	{
		label: 'Reliable AI',
		copy: 'I build research prototypes for explainable routing, outbound-data inspection, deterministic testing, and consent-aware memory so decisions and failures are inspectable.',
	},
	{
		label: 'Research and evaluation',
		copy: 'I turn broad translational questions into studyable designs with reference standards, confounder planning, provenance, leakage-safe validation, and claims matched to evidence.',
	},
];

export const notes = [
	{
		slug: 'patient-feedback-loop',
		label: 'Patient experience',
		title: 'Why do most patients leave without telling us what they really experienced?',
		copy: 'A closer look at the silent gap between a patient visit, an honest response, and the reason someone chooses to return.',
		view: [
			'Most patients never leave feedback. That silence does not tell us whether the experience was good or bad; it may simply mean that the feedback loop asked for effort after the visit and gave the patient no reason to be candid. Without that response, a hospital can mistake quiet for satisfaction and miss the moments that decide whether someone returns.',
			'We shaped a patient-engagement system that uses lightweight gamification and rewards to make honest feedback easier to give. It can route themes toward the right service-recovery or experience owner, while keeping clinical escalation, safeguarding, grievance handling, and emergency care outside its scope.',
			'The larger opportunity is a patient-retention system built around a return loop: show patients that their feedback changed something, learn what would make the next visit better, and create a reason to choose the same hospital or clinic again. The unresolved design question is how to reward candor without rewarding praise, and how to build retention without making care feel like a loyalty programme.',
		],
	},
	{
		slug: 'clinical-ai-refusal',
		label: 'Clinical AI',
		title: 'When should a clinical AI system say, “not here”?',
		copy: 'A closer look at how a safe refusal can protect a clinician’s time, a patient’s safety, and the handoff when a case exceeds the model’s intended use.',
		view: [
			'An AI answer can feel helpful even when it is answering the wrong question. In a clinical workflow, a confident response to incomplete context can consume a clinician’s time, hide uncertainty, and send a patient toward a path no one intended.',
			'In the AI Firewall, AI Routing Gateway, and smart-glasses work, I am exploring bounded routing, fail-closed behavior, explicit handoffs, and synthetic tests for missing context, tool failure, and requests outside intended use.',
			'The impact is not measured only by how often a model answers. It is measured by whether the system can recognize when another person must take over, explain that boundary clearly, and make the safer next action easy to follow.',
		],
	},
	{
		slug: 'privacy-as-product-behavior',
		label: 'Privacy',
		title: 'Can a privacy boundary become something a patient can feel?',
		copy: 'A closer look at what should happen before sensitive information reaches a cloud service, and how visible controls can protect trust.',
		view: [
			'People cannot meaningfully consent to a cloud call they cannot see. Sensitive details can leave through a prompt, a log, or an overlooked field long before anyone notices that the boundary has moved.',
			'The AI Firewall is a local gateway prototype that inspects outbound JSON before cloud calls, with allow, redact, and block decisions plus metadata-only audit events. It explores whether privacy can become behavior the team can test and the operator can understand.',
			'The impact is a system that fails safely before exposure and asks for permission instead of silently guessing. A privacy boundary becomes real when the person using the workflow can see it, question it, and trust what happens next.',
		],
	},
	{
		slug: 'whole-system-evaluation',
		label: 'Evidence',
		title: 'What breaks between a good AI demo and a trustworthy system?',
		copy: 'A closer look at the failures that appear after the demo: bad routing, weak provenance, unsafe tools, slow responses, and people who cannot tell what happened.',
		view: [
			'A demo can be right once and still fail in a real workflow. The model may choose the wrong specialist, call a tool with unsupported arguments, lose the source behind an answer, respond too slowly, or leave an operator unsure whether the system actually did what it claimed.',
			'SystemBench explores evaluation across task success, reliability, groundedness, tool correctness, safety, performance, operability, and human interaction. The aim is to make the failure visible while there is still time to change the design.',
			'The impact is a better decision about what to ship, what to constrain, and what to keep researching. Evaluation should not be a larger checklist; it should make every claim proportionate to the behavior the system has demonstrated.',
		],
	},
	{
		slug: 'health-tech-study-question',
		label: 'Translational research',
		title: 'When does a promising signal become a useful test?',
		copy: 'A closer look at the decisions that move a health-tech idea from an exciting signal toward a claim clinicians and patients can actually use.',
		view: [
			'Non-invasive sensing can make a biological signal feel like a shortcut to a diagnosis. But a signal becomes useful only when we know what it is being compared against, which people it may fail for, and what decision it is supposed to improve.',
			'BioVOC, NeoGlycemia, and metabolic-risk research planning point to the same discipline: define intended use, reference standard, confounders, provenance, and validation before making a clinical claim.',
			'The impact is not just a device that detects something interesting. It is a study design that tells clinicians when to trust the result, when to ask for another measure, and what to build next without overpromising to the patient.',
		],
	},
	{
		slug: 'prototype-uncertainty',
		label: 'Clinical prototypes',
		title: 'Can a prototype show when it should not be trusted?',
		copy: 'A closer look at how poor capture, missing data, and invalid states should change the next action before a measurement becomes a conclusion.',
		view: [
			'Measurements often look more certain than they are. A blurry scan, a lost device connection, or missing context can still produce a number that feels precise enough to act on.',
			'The Clinical LiDAR Framework and Smart Glasses simulator explore how a tool can show poor capture, missing data, or an invalid state before a measurement is mistaken for a conclusion. The prototype uses synthetic inputs, calibration, quality gates, and vendor-neutral contracts to make those limits testable.',
			'The impact is a safer next step: ask for better input, hand the case to a person, or stop the workflow. Uncertainty should be visible where a decision is made, not hidden in a disclaimer after the decision.',
		],
	},
	{
		slug: 'consent-aware-personalization',
		label: 'Personalization',
		title: 'Can an AI remember enough to help without remembering too much?',
		copy: 'A closer look at how consent-aware memory can make personalization useful without turning a person’s history into an invisible data store.',
		view: [
			'Personalization begins with a promise: the system will understand a person better next time. Without visible consent and control, that promise can quietly become a record of someone’s life that they cannot inspect, correct, or delete.',
			'Reflection AI explores consent-aware memory with provenance, isolation, deletion, rollback, and gated training. A person should be able to see what was retained, understand why it was used, change their mind, and recover from a bad inference.',
			'The impact is trust that can be exercised instead of trust that must simply be requested. Memory becomes part of the product experience, with controls that help a person decide what the system is allowed to carry forward.',
		],
	},
];

export const feedbackEmail = 'manu@healthunited.in';

export const focusTags = [
	'Deep tech',
	'Reliable AI',
	'Health technology',
	'Clinical research',
	'Translational research',
	'Privacy and safety',
	'Medical devices',
	'Neurotechnology',
	'Biomarker research',
	'System evaluation',
];

export const researchInterests = [
	{
		title: 'Alternative periodic systems',
		label: 'Chemistry and representation',
		copy: 'Exploring whether a more advanced periodic table can reveal useful relationships without changing standard element names, symbols, or atomic numbers.',
	},
	{
		title: 'Breath VOC research',
		label: 'Non-invasive sensing',
		copy: 'Building a traceable framework for breath sampling, instrumentation, confounders, intended use, and validation before a biomarker claim is made.',
	},
	{
		title: 'Telomere and healthy-aging research',
		label: 'Longitudinal biology',
		copy: 'Interested in multi-factor models that combine telomere biology with metabolic, inflammatory, genomic, and functional measures.',
	},
	{
		title: 'Disfigurement and appearance measurement',
		label: 'Clinical measurement',
		copy: 'Exploring calibrated geometry and longitudinal documentation for appearance and disfigurement research, with emphasis on measurement quality and patient-centred interpretation.',
	},
	{
		title: 'Neuromodulation and neuroplasticity',
		label: 'Devices and interaction',
		copy: 'Interested in how neuromodulation and device interfaces should be framed, tested, and explained before they are treated as clinical solutions.',
	},
	{
		title: 'Patient communication and service recovery',
		label: 'Care experience',
		copy: 'Designing bounded ways to collect, route, and respond to feedback without confusing routine service recovery with emergency or clinical care.',
	},
	{
		title: 'Consent and digital-health infrastructure',
		label: 'Health systems',
		copy: 'Curious about consent, interoperability, audit trails, and low-bandwidth workflows that make digital health more usable in real settings.',
	},
];

export const projects = [
	{
		title: 'AI Routing Gateway',
		status: 'Open source / alpha',
		copy: 'AI Routing Gateway is intended to send each query to the model or specialist workflow most likely to return a reliable answer, while keeping the routing decision explainable and testable across multiple LLMs.',
		href: 'https://github.com/manufaujdar/ai-routing-gateway',
		label: 'View repository',
	},
	{
		title: 'AI Firewall',
		status: 'Open source / foundation',
		copy: 'AI Firewall is intended to inspect outbound data before a cloud AI call and allow, redact, or block sensitive information, giving regulated teams a visible privacy control for each request.',
		href: 'https://github.com/manufaujdar/ai-firewall',
		label: 'View repository',
	},
	{
		title: 'SystemBench',
		status: 'Open source / research prototype',
		copy: 'SystemBench is intended to evaluate an AI system across routing, tool correctness, provenance, safety, latency, operability, and task success so teams can see where the complete workflow breaks.',
		href: 'https://github.com/manufaujdar/systembench',
		label: 'View repository',
	},
	{
		title: 'Smart Glasses Clinical Platform',
		status: 'Open source / research prototype',
		copy: 'Smart Glasses Clinical Platform is intended to simulate clinical smart-glasses workflows and test capture, connection, voice, device contracts, and workflow states before a real deployment.',
		href: 'https://github.com/manufaujdar/smart-glasses',
		label: 'View repository',
	},
	{
		title: 'Clinical LiDAR Framework',
		status: 'Open source / early release',
		copy: 'Clinical LiDAR Framework is intended to create calibrated three-dimensional wound-surface measurements with quality gates that can be compared across visits instead of relying only on similar-looking images.',
		href: 'https://github.com/manufaujdar/clinical-lidar-framework',
		label: 'View repository',
	},
	{
		title: 'Reflection AI',
		status: 'Public repository / research framework',
		copy: 'Reflection AI is intended to provide consent-aware AI memory with provenance, inspection, deletion, rollback, and gated learning so people can control what personalization carries forward.',
		href: 'https://github.com/manufaujdar/reflection-ai',
		label: 'View repository',
	},
	{
		title: 'Web of Thoughts',
		status: 'Open source / experimental',
		copy: 'Web of Thoughts is intended to represent reasoning as typed, inspectable relations with peer review and evaluation records instead of hiding the entire path inside one answer.',
		href: 'https://github.com/manufaujdar/web-of-thoughts',
		label: 'View repository',
	},
	{
		title: 'Periodic Table Research',
		status: 'Private research workspace',
		copy: 'Periodic Table Research is intended to test alternative layouts for representing relationships among elements while preserving standard names, symbols, and atomic numbers.',
	},
	{
		title: 'Master LLM',
		status: 'Closed source / private',
		copy: 'Master LLM is intended to coordinate model routing, collaboration, evaluation, privacy controls, and product infrastructure for AI systems designed for regulated fields. The implementation is private.',
	},
	{
		title: 'Clinical Feedback System',
		status: 'Closed source / synthetic prototype',
		copy: 'Clinical Feedback System is intended to collect and reward honest patient feedback, route themes to the right service owner, and support patient engagement and retention without absorbing clinical escalation. The prototype uses synthetic scenarios.',
	},
	{
		title: 'BioVOC',
		status: 'Private research workspace',
		copy: 'BioVOC is intended to investigate whether biological volatile organic compounds found in breath can signal cancer-related activity in the body, using a non-invasive breath sample and a traceable validation pathway.',
	},
	{
		title: 'Telomere Research',
		status: 'Private research workspace',
		copy: 'Telomere Research is intended to study healthy aging by combining telomere biology with metabolic, inflammatory, genomic, and functional measures collected over time.',
	},
	{
		title: 'Disfigurement Index',
		status: 'Open source / research prototype',
		copy: 'Disfigurement Index is intended to support structured, calibrated, longitudinal documentation of appearance and disfigurement without reducing a person’s experience to a single score.',
		href: 'https://github.com/manufaujdar/Disfigurement-Index',
		label: 'View repository',
	},
];

export const selectedResearch = [
	'Robotic-Assisted and Artificial Intelligence-Enabled Systems in Interventional Radiology: A Structured Narrative Review',
	'Comparative effectiveness of chemical tissue adhesives versus conventional sutures for surgical skin closure in high-risk patients with impaired wound healing: systematic review and narrative synthesis',
	'Patient-Reported Communication, Consent and Discharge Gaps in General Surgery: A Cross-Sectional Perioperative Experience Study from India',
	'Aquagenic pruritus unmasking polycythaemia vera with coexisting JAK2 V617F and BCR::ABL1 driver mutations',
	'Kikuchi-Fujimoto-Like Lymphadenitis as an Initial Presentation of Systemic Lupus Erythematosus: A Diagnostic Pitfall in a Young Male',
	'Psychological Distress and Health-Related Quality of Life Among Cancer Patients Receiving Radiotherapy With or Without Concurrent Chemotherapy: A Cross-Sectional Study',
	'Predictors of Arteriovenous Fistula Maturation in Patients with Chronic Kidney Disease on Hemodialysis: A Systematic Review',
];

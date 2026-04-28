import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding DTODP database...");

  // Clean existing data
  await prisma.validationLog.deleteMany();
  await prisma.dataSubmission.deleteMany();
  await prisma.dataForm.deleteMany();
  await prisma.observation.deleteMany();
  await prisma.escalation.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.activityLog.deleteMany();
  await prisma.task.deleteMany();
  await prisma.trialPhaseRecord.deleteMany();
  await prisma.trialLocation.deleteMany();
  await prisma.trialFarmer.deleteMany();
  await prisma.document.deleteMany();
  await prisma.trial.deleteMany();
  await prisma.farmer.deleteMany();
  await prisma.location.deleteMany();
  await prisma.slaTemplate.deleteMany();
  await prisma.user.deleteMany();

  const hash = await bcrypt.hash("password123", 12);

  // Create users
  const admin = await prisma.user.create({
    data: {
      email: "admin@oneacrefund.org",
      passwordHash: hash,
      name: "Dr. Jean-Claude Habimana",
      role: "ADMIN",
      department: "Agricultural Innovations",
    },
  });

  const trialOwner = await prisma.user.create({
    data: {
      email: "marie@oneacrefund.org",
      passwordHash: hash,
      name: "Marie Uwimana",
      role: "TRIAL_OWNER",
      department: "Agricultural Innovations",
    },
  });

  const dataTeam = await prisma.user.create({
    data: {
      email: "eric@oneacrefund.org",
      passwordHash: hash,
      name: "Eric Nkurunziza",
      role: "DATA_TEAM",
      department: "Data Operations",
    },
  });

  const stationTeam = await prisma.user.create({
    data: {
      email: "alice@oneacrefund.org",
      passwordHash: hash,
      name: "Alice Mukamana",
      role: "STATION_TEAM",
      department: "Station Trials",
    },
  });

  const fieldTeam = await prisma.user.create({
    data: {
      email: "jean@oneacrefund.org",
      passwordHash: hash,
      name: "Jean-Pierre Mugabo",
      role: "FIELD_TRIALS_TEAM",
      department: "On-Farm Trials",
    },
  });

  const labTeam = await prisma.user.create({
    data: {
      email: "grace@oneacrefund.org",
      passwordHash: hash,
      name: "Grace Ingabire",
      role: "LAB_TEAM",
      department: "Laboratory",
    },
  });

  const inventoryTeam = await prisma.user.create({
    data: {
      email: "patrick@oneacrefund.org",
      passwordHash: hash,
      name: "Patrick Nshimiyimana",
      role: "INVENTORY_TEAM",
      department: "Inventory",
    },
  });

  console.log("✅ Users created");

  // Create locations
  const rubona = await prisma.location.create({
    data: { name: "Rubona Station", district: "Huye", province: "Southern", type: "STATION", latitude: -2.4849, longitude: 29.7753 },
  });

  const karama = await prisma.location.create({
    data: { name: "Karama Station", district: "Bugesera", province: "Eastern", type: "STATION", latitude: -2.2717, longitude: 30.1606 },
  });

  const bugesera = await prisma.location.create({
    data: { name: "Bugesera District Fields", district: "Bugesera", province: "Eastern", type: "FIELD", latitude: -2.29, longitude: 30.06 },
  });

  const musanze = await prisma.location.create({
    data: { name: "Musanze District Fields", district: "Musanze", province: "Northern", type: "FIELD", latitude: -1.4997, longitude: 29.6349 },
  });

  console.log("✅ Locations created");

  // Create farmers
  const farmers = await Promise.all(
    [
      { farmerId: "F-001", name: "Emmanuel Habineza", phone: "+250788111001", district: "Bugesera", sector: "Rilima", cell: "Kagasa" },
      { farmerId: "F-002", name: "Claudine Uwamahoro", phone: "+250788111002", district: "Bugesera", sector: "Gashora", cell: "Kabuye" },
      { farmerId: "F-003", name: "Pierre Ndayisaba", phone: "+250788111003", district: "Musanze", sector: "Muhoza", cell: "Ruhengeri" },
      { farmerId: "F-004", name: "Diane Mukeshimana", phone: "+250788111004", district: "Musanze", sector: "Cyuve", cell: "Kigombe" },
      { farmerId: "F-005", name: "Innocent Niyonzima", phone: "+250788111005", district: "Huye", sector: "Ngoma", cell: "Butare" },
    ].map((f) => prisma.farmer.create({ data: f }))
  );

  console.log("✅ Farmers created");

  // Create SLA Templates
  const slaTemplates = await Promise.all([
    prisma.slaTemplate.create({
      data: {
        serviceCategory: "Trial Planning",
        taskName: "Trial Plan Submission",
        description: "Trial owners submit complete trial plans",
        servingTeam: "TRIAL_OWNER",
        clientTeam: "ADMIN",
        defaultDaysToComplete: 30,
        seasonADeadline: "Jan 15",
      },
    }),
    prisma.slaTemplate.create({
      data: {
        serviceCategory: "Data Operations",
        taskName: "Data Collection Materials Prep",
        description: "Data team prepares collection forms and tools",
        servingTeam: "DATA_TEAM",
        clientTeam: "TRIAL_OWNER",
        defaultDaysToComplete: 14,
        seasonADeadline: "Feb 1",
      },
    }),
    prisma.slaTemplate.create({
      data: {
        serviceCategory: "Station Trials",
        taskName: "Station Trial Setup",
        description: "Station team sets up and plants trials",
        servingTeam: "STATION_TEAM",
        clientTeam: "TRIAL_OWNER",
        defaultDaysToComplete: 21,
        seasonADeadline: "Feb 15",
      },
    }),
    prisma.slaTemplate.create({
      data: {
        serviceCategory: "Laboratory",
        taskName: "Lab Sample Analysis",
        description: "Lab team processes and analyzes samples",
        servingTeam: "LAB_TEAM",
        clientTeam: "TRIAL_OWNER",
        defaultDaysToComplete: 14,
        seasonADeadline: "Ongoing",
      },
    }),
  ]);

  console.log("✅ SLA Templates created");

  // Create Trials
  const trial1 = await prisma.trial.create({
    data: {
      code: "TR-A2025-001",
      name: "Maize Hybrid Variety Evaluation",
      description: "Evaluating 8 hybrid maize varieties for yield performance, disease resistance, and farmer preference in Season A 2025.",
      objectives: "Compare yield of new maize hybrids against the current standard variety; evaluate disease resistance; assess farmer preference.",
      hypotheses: "New hybrid varieties will yield at least 15% more than the standard variety under similar conditions.",
      kpis: "Grain yield (t/ha), plant height (cm), disease incidence (%), harvest index, farmer preference score",
      variables: "Variety (8 treatments), Replications (3), Location (2 stations)",
      cropType: "Maize",
      season: "A",
      year: 2025,
      phase: "PHASE_1",
      status: "ACTIVE",
      plotSize: "5m x 5m",
      sampleSize: 48,
      experimentDesign: "RCBD",
      treatments: "V1 (Standard), V2 (Hybrid A), V3 (Hybrid B), V4 (Hybrid C), V5 (Hybrid D), V6 (Hybrid E), V7 (Hybrid F), V8 (Hybrid G)",
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-07-31"),
      ownerId: trialOwner.id,
    },
  });

  const trial2 = await prisma.trial.create({
    data: {
      code: "TR-A2025-002",
      name: "Climbing Bean Intercropping Trial",
      description: "Testing climbing bean intercropping systems with banana for smallholder farmers in highland zones.",
      objectives: "Determine optimal planting density; measure bean and banana yield; assess soil nitrogen fixation benefits.",
      cropType: "Beans",
      season: "A",
      year: 2025,
      phase: "PHASE_2",
      status: "ACTIVE",
      plotSize: "10m x 10m",
      sampleSize: 120,
      experimentDesign: "TRICOT",
      startDate: new Date("2025-02-15"),
      endDate: new Date("2025-08-15"),
      ownerId: trialOwner.id,
    },
  });

  const trial3 = await prisma.trial.create({
    data: {
      code: "TR-B2025-001",
      name: "Potato Late Blight Fungicide Efficacy",
      description: "Evaluating 5 fungicide programs for late blight management in potato production.",
      cropType: "Potato",
      season: "B",
      year: 2025,
      phase: "PHASE_0",
      status: "PLANNING",
      experimentDesign: "RCBD",
      ownerId: trialOwner.id,
    },
  });

  console.log("✅ Trials created");

  // Link trials to locations and farmers
  await prisma.trialLocation.createMany({
    data: [
      { trialId: trial1.id, locationId: rubona.id },
      { trialId: trial1.id, locationId: karama.id },
      { trialId: trial2.id, locationId: bugesera.id },
      { trialId: trial2.id, locationId: musanze.id },
    ],
  });

  await prisma.trialFarmer.createMany({
    data: farmers.map((f) => ({ trialId: trial2.id, farmerId: f.id })),
  });

  // Create Trial Phase Records
  await prisma.trialPhaseRecord.createMany({
    data: [
      { trialId: trial1.id, phase: "PHASE_0", isComplete: true, startDate: new Date("2024-11-01"), endDate: new Date("2024-12-31"), completedAt: new Date("2024-12-31") },
      { trialId: trial1.id, phase: "PHASE_1", isComplete: false, startDate: new Date("2025-02-01") },
      { trialId: trial2.id, phase: "PHASE_0", isComplete: true, startDate: new Date("2024-10-15"), endDate: new Date("2024-12-20"), completedAt: new Date("2024-12-20") },
      { trialId: trial2.id, phase: "PHASE_1", isComplete: true, startDate: new Date("2025-01-05"), endDate: new Date("2025-02-10"), completedAt: new Date("2025-02-10") },
      { trialId: trial2.id, phase: "PHASE_2", isComplete: false, startDate: new Date("2025-02-15") },
    ],
  });

  console.log("✅ Trial phases created");

  // Create Tasks
  const now = new Date();
  const d = (days: number) => new Date(now.getTime() + days * 86400000);

  await prisma.task.createMany({
    data: [
      { title: "Complete maize trial planting at Rubona", description: "Plant all 48 plots with labeled varieties per randomization plan", trialId: trial1.id, assigneeId: stationTeam.id, creatorId: trialOwner.id, priority: "HIGH", status: "IN_PROGRESS", dueDate: d(5), slaDeadline: d(5), season: "A", year: 2025 },
      { title: "Prepare data collection forms for maize trial", description: "Design and deploy ODK/KoboToolbox forms", trialId: trial1.id, assigneeId: dataTeam.id, creatorId: trialOwner.id, priority: "HIGH", status: "COMPLETED", completedAt: new Date("2025-01-28"), dueDate: d(-5), slaDeadline: d(-5), season: "A", year: 2025 },
      { title: "Soil sampling at Rubona & Karama", description: "Collect baseline soil samples from all trial plots", trialId: trial1.id, assigneeId: labTeam.id, creatorId: trialOwner.id, priority: "MEDIUM", status: "NOT_STARTED", dueDate: d(10), slaDeadline: d(10), season: "A", year: 2025 },
      { title: "Germination data collection — Week 2", description: "Record germination rate, plant stand count per plot", trialId: trial1.id, assigneeId: stationTeam.id, creatorId: dataTeam.id, priority: "HIGH", status: "NOT_STARTED", dueDate: d(14), slaDeadline: d(14), season: "A", year: 2025 },
      { title: "Recruit and train farmers for bean trial", description: "Select 120 farmers and conduct tricot training", trialId: trial2.id, assigneeId: fieldTeam.id, creatorId: trialOwner.id, priority: "CRITICAL", status: "IN_PROGRESS", dueDate: d(3), slaDeadline: d(3), season: "A", year: 2025 },
      { title: "Distribute bean seed packages to farmers", description: "Package and deliver seed to 120 tricot farmers", trialId: trial2.id, assigneeId: inventoryTeam.id, creatorId: fieldTeam.id, priority: "HIGH", status: "NOT_STARTED", dueDate: d(7), slaDeadline: d(7), season: "A", year: 2025 },
      { title: "First agronomic observation — bean trial", description: "Record emergence, plant vigor, disease incidence at 21 DAP", trialId: trial2.id, assigneeId: fieldTeam.id, creatorId: dataTeam.id, priority: "MEDIUM", status: "NOT_STARTED", dueDate: d(21), slaDeadline: d(21), season: "A", year: 2025 },
      { title: "Draft potato trial protocol", description: "Complete Phase 0 research protocol for management review", trialId: trial3.id, assigneeId: trialOwner.id, creatorId: admin.id, priority: "HIGH", status: "IN_PROGRESS", dueDate: d(15), slaDeadline: d(15), season: "B", year: 2025 },
      { title: "Review & approve potato trial budget", description: "Finance review for potato late blight trial", trialId: trial3.id, assigneeId: admin.id, creatorId: trialOwner.id, priority: "MEDIUM", status: "NOT_STARTED", dueDate: d(20), slaDeadline: d(20), season: "B", year: 2025 },
      { title: "Monthly SLA compliance report", description: "Generate and distribute monthly SLA tracking report to all teams", assigneeId: dataTeam.id, creatorId: admin.id, priority: "HIGH", status: "OVERDUE", dueDate: d(-2), slaDeadline: d(-2), isOverdue: true, season: "A", year: 2025 },
    ],
  });

  console.log("✅ Tasks created");

  // Create Data Forms
  const maizeForm = await prisma.dataForm.create({
    data: {
      trialId: trial1.id,
      name: "Maize Agronomic Observation Form",
      description: "Weekly agronomic data collection for maize hybrid trial",
      schema: {
        fields: [
          { name: "plot_id", label: "Plot ID", type: "text", required: true, placeholder: "e.g., R1-V3-P2" },
          { name: "observation_date", label: "Observation Date", type: "date", required: true },
          { name: "plant_height", label: "Plant Height", type: "number", required: true, unit: "cm", min: 0, max: 400 },
          { name: "leaf_count", label: "Leaf Count", type: "number", required: true, min: 0, max: 20 },
          { name: "stem_diameter", label: "Stem Diameter", type: "number", required: false, unit: "mm", min: 0, max: 50 },
          { name: "disease_score", label: "Disease Severity Score", type: "select", required: true, options: ["0 - None", "1 - Light", "2 - Moderate", "3 - Severe", "4 - Very Severe"] },
          { name: "pest_damage", label: "Pest Damage Observed", type: "checkbox", required: false, placeholder: "Pest damage present" },
          { name: "notes", label: "Field Notes", type: "textarea", required: false, placeholder: "Any additional observations..." },
        ],
      },
      version: 1,
    },
  });

  const beanForm = await prisma.dataForm.create({
    data: {
      trialId: trial2.id,
      name: "Tricot Bean Farmer Observation Form",
      description: "Farmer-level observation for climbing bean tricot trial",
      schema: {
        fields: [
          { name: "farmer_id", label: "Farmer ID", type: "text", required: true },
          { name: "observation_date", label: "Observation Date", type: "date", required: true },
          { name: "variety_ranking", label: "Variety Ranking (Best to Worst)", type: "text", required: true, placeholder: "e.g., A > C > B" },
          { name: "germination_rate", label: "Germination Rate", type: "select", required: true, options: ["Excellent (>90%)", "Good (70-90%)", "Fair (50-70%)", "Poor (<50%)"] },
          { name: "plant_vigor", label: "Plant Vigor", type: "select", required: true, options: ["Very Strong", "Strong", "Average", "Weak"] },
          { name: "pod_count", label: "Estimated Pod Count per Plant", type: "number", required: false, min: 0, max: 100 },
          { name: "farmer_comments", label: "Farmer Comments", type: "textarea", required: false, placeholder: "Record farmer observations in their own words..." },
        ],
      },
      version: 1,
    },
  });

  console.log("✅ Data forms created");

  // Create sample submissions
  await prisma.dataSubmission.create({
    data: {
      formId: maizeForm.id,
      trialId: trial1.id,
      submitterId: stationTeam.id,
      data: {
        plot_id: "R1-V1-P1",
        observation_date: "2025-02-15",
        plant_height: 45,
        leaf_count: 6,
        stem_diameter: 12,
        disease_score: "0 - None",
        pest_damage: false,
        notes: "Good establishment, uniform emergence",
      },
      status: "VALIDATED",
      submittedAt: new Date("2025-02-15"),
      validatedAt: new Date("2025-02-16"),
      notes: "Validated by data team",
    },
  });

  await prisma.dataSubmission.create({
    data: {
      formId: maizeForm.id,
      trialId: trial1.id,
      submitterId: stationTeam.id,
      data: {
        plot_id: "R1-V2-P1",
        observation_date: "2025-02-15",
        plant_height: 52,
        leaf_count: 7,
        stem_diameter: 14,
        disease_score: "1 - Light",
        pest_damage: false,
        notes: "Slightly taller than V1, minor leaf spots observed",
      },
      status: "SUBMITTED",
      submittedAt: new Date("2025-02-15"),
    },
  });

  await prisma.dataSubmission.create({
    data: {
      formId: beanForm.id,
      trialId: trial2.id,
      submitterId: fieldTeam.id,
      data: {
        farmer_id: "F-001",
        observation_date: "2025-03-01",
        variety_ranking: "A > B > C",
        germination_rate: "Good (70-90%)",
        plant_vigor: "Strong",
        pod_count: 18,
        farmer_comments: "Variety A climbed faster and has more leaves",
      },
      status: "SUBMITTED",
      submittedAt: new Date("2025-03-01"),
    },
  });

  console.log("✅ Submissions created");

  // Create notifications
  await prisma.notification.createMany({
    data: [
      { userId: trialOwner.id, title: "Planting completed at Rubona", message: "Station team has finished planting maize trial plots.", type: "info" },
      { userId: dataTeam.id, title: "New data submission pending review", message: "2 new submissions for maize trial need validation.", type: "action" },
      { userId: admin.id, title: "SLA compliance report overdue", message: "Monthly SLA compliance report is 2 days overdue.", type: "warning" },
      { userId: fieldTeam.id, title: "Farmer training deadline approaching", message: "Recruit and train 120 farmers — due in 3 days.", type: "reminder" },
    ],
  });

  console.log("✅ Notifications created");
  console.log("\n🎉 DTODP database seeded successfully!");
  console.log("\n📋 Demo Credentials:");
  console.log("   Admin:       admin@oneacrefund.org / password123");
  console.log("   Trial Owner: marie@oneacrefund.org / password123");
  console.log("   Data Team:   eric@oneacrefund.org  / password123");
  console.log("   Station:     alice@oneacrefund.org / password123");
  console.log("   Field:       jean@oneacrefund.org  / password123");
  console.log("   Lab:         grace@oneacrefund.org / password123");
  console.log("   Inventory:   patrick@oneacrefund.org / password123");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

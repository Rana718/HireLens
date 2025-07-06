-- ENUM: AuthProvider
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'GITHUB', 'CREDENTIALS');

-- TABLE: User
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    name TEXT NOT NULL,
    imageUrl TEXT,
    industry TEXT,
    bio TEXT,
    experience INT,
    currentCv TEXT,
    skills TEXT [] NOT NULL,
    linkedInProfile TEXT,
    github TEXT,
    provider "AuthProvider" DEFAULT 'CREDENTIALS'::"AuthProvider",
    providerAccountId TEXT UNIQUE,
    emailVerified BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_user_industry FOREIGN KEY (industry) REFERENCES "IndustryInsight"(industry)
);

-- TABLE: IndustryInsight
CREATE TABLE "IndustryInsight" (
    id SERIAL PRIMARY KEY,
    industry TEXT UNIQUE NOT NULL,
    salaryRanges JSONB [] NOT NULL,
    growthRate FLOAT NOT NULL,
    demandLevel TEXT NOT NULL,
    topSkills TEXT [] NOT NULL,
    marketOutlook TEXT NOT NULL,
    keyTrends TEXT [] NOT NULL,
    recommendedSkills TEXT [] NOT NULL,
    lastUpdated TIMESTAMPTZ DEFAULT now(),
    nextUpdate TIMESTAMPTZ NOT NULL
);

-- TABLE: Assessment
CREATE TABLE "Assessment" (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    quizScore FLOAT NOT NULL,
    questions JSONB [] NOT NULL,
    category TEXT NOT NULL,
    improvementTip TEXT,
    createdAt TIMESTAMPTZ DEFAULT now(),
    updatedAt TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_assessment_user FOREIGN KEY (userId) REFERENCES "User"(id)
);

CREATE INDEX idx_assessment_user ON "Assessment"(userId);

-- TABLE: Resume
CREATE TABLE "Resume" (
    id SERIAL PRIMARY KEY,
    userId INT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    atsScore FLOAT,
    feedback TEXT,
    createdAt TIMESTAMPTZ DEFAULT now(),
    updatedAt TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_resume_user FOREIGN KEY (userId) REFERENCES "User"(id)
);

-- TABLE: CoverLetter
CREATE TABLE "CoverLetter" (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    content TEXT NOT NULL,
    jobDescription TEXT,
    companyName TEXT NOT NULL,
    jobTitle TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    createdAt TIMESTAMPTZ DEFAULT now(),
    updatedAt TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_coverletter_user FOREIGN KEY (userId) REFERENCES "User"(id)
);

CREATE INDEX idx_coverletter_user ON "CoverLetter"(userId);

-- TABLE: MockInterviewAnswer
CREATE TABLE "MockInterviewAnswer" (
    id SERIAL PRIMARY KEY,
    jsonMockResp JSONB [] NOT NULL,
    jobPosition TEXT NOT NULL,
    jobDesc TEXT NOT NULL,
    jobExperience TEXT NOT NULL,
    mockId TEXT NOT NULL,
    question TEXT NOT NULL,
    correctAns TEXT,
    userAns TEXT,
    feedback TEXT,
    rating TEXT,
    userId INT NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_mock_user FOREIGN KEY (userId) REFERENCES "User"(id)
);
class JobController {
    constructor() {
        this.jobs = [
            {
                id: 1,
                title: "Senior React Developer",
                company: "Tech Corp",
                location: "Remote",
                type: "Full-time",
                description: "We are looking for an experienced React developer to build a new dashboard. You will be working with a team of 5 developers to create a scalable and performant application.",
                requirements: ["5+ years React", "TypeScript", "Node.js", "AWS"],
                budget: 5000,
                budgetType: "Fixed Price",
                postedTime: "2 hours ago",
                tags: ["React", "Next.js", "Tailwind CSS"],
                proposals: 5,
                category: "Development",
                featured: true
            },
            {
                id: 2,
                title: "Logo Design for Startup",
                company: "FinStart",
                location: "Remote",
                type: "Contract",
                description: "Need a modern and minimalist logo for a fintech startup. The logo should represent trust, growth, and innovation.",
                requirements: ["Portfolio required", "Adobe Illustrator", "Branding experience"],
                budget: 300,
                budgetType: "Fixed Price",
                postedTime: "5 hours ago",
                tags: ["Logo Design", "Illustrator", "Branding"],
                proposals: 12,
                category: "Design",
                featured: false
            },
            {
                id: 3,
                title: "SEO Optimization Expert",
                company: "Shopify Store",
                location: "New York, USA",
                type: "Part-time",
                description: "Improve ranking for our e-commerce website. We need someone who can audit our site and implement on-page and off-page SEO strategies.",
                requirements: ["Proven track record", "Google Analytics", "Keyword Research"],
                budget: 50,
                budgetType: "Hourly",
                postedTime: "1 day ago",
                tags: ["SEO", "Marketing", "Google Analytics"],
                proposals: 8,
                category: "Marketing",
                featured: false
            },
             {
                id: 4,
                title: "Mobile App Development (Flutter)",
                company: "Appify",
                location: "Remote",
                type: "Contract",
                description: "Cross-platform mobile app using Flutter. The app will be a social networking platform with real-time chat and video calling features.",
                requirements: ["Flutter", "Dart", "Firebase", "WebRTC"],
                budget: 2000,
                budgetType: "Fixed Price",
                postedTime: "2 days ago",
                tags: ["Flutter", "Dart", "Mobile"],
                proposals: 3,
                category: "Development",
                featured: true
            },
            {
                id: 5,
                title: "Content Writer for Tech Blog",
                company: "DevDaily",
                location: "Remote",
                type: "Freelance",
                description: "Looking for a technical writer to produce high-quality blog posts about web development trends, tutorials, and best practices.",
                requirements: ["Technical background", "Excellent English", "SEO knowledge"],
                budget: 100,
                budgetType: "Per Article",
                postedTime: "3 days ago",
                tags: ["Writing", "Tech", "Blog"],
                proposals: 15,
                category: "Writing",
                featured: false
            },
            {
                id: 6,
                title: "Virtual Assistant",
                company: "Busy CEO",
                location: "Remote",
                type: "Part-time",
                description: "Need a reliable virtual assistant to manage emails, schedule meetings, and handle travel arrangements.",
                requirements: ["Organized", "Communication skills", "Google Workspace"],
                budget: 20,
                budgetType: "Hourly",
                postedTime: "4 hours ago",
                tags: ["Admin", "Virtual Assistant"],
                proposals: 25,
                category: "Admin",
                featured: false
            },
            {
                id: 7,
                title: "UI/UX Designer for SaaS",
                company: "CloudScale",
                location: "San Francisco, CA",
                type: "Contract",
                description: "Redesign our SaaS platform to improve user experience and conversion rates. We need a clean, modern, and intuitive interface.",
                requirements: ["Figma", "SaaS experience", "User Research"],
                budget: 4000,
                budgetType: "Fixed Price",
                postedTime: "1 week ago",
                tags: ["UI/UX", "Figma", "SaaS"],
                proposals: 10,
                category: "Design",
                featured: true
            }
        ];
        this.applications = [];
    }

    async getJobs(filter = {}) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let filteredJobs = this.jobs;
                
                if (filter.category && filter.category !== 'All') {
                    filteredJobs = filteredJobs.filter(job => job.category === filter.category);
                }
                
                if (filter.search) {
                    const searchLower = filter.search.toLowerCase();
                    filteredJobs = filteredJobs.filter(job => 
                        job.title.toLowerCase().includes(searchLower) || 
                        job.description.toLowerCase().includes(searchLower) ||
                        job.tags.some(tag => tag.toLowerCase().includes(searchLower))
                    );
                }

                if (filter.type && filter.type !== 'All') {
                     filteredJobs = filteredJobs.filter(job => job.type === filter.type);
                }

                if (filter.minBudget) {
                    filteredJobs = filteredJobs.filter(job => {
                         // Simple check, assuming fixed price for simplicity in filtering
                         return job.budget >= parseInt(filter.minBudget);
                    });
                }

                resolve(filteredJobs);
            }, 500);
        });
    }

    async getJob(id) {
         return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.jobs.find(j => j.id === parseInt(id)));
            }, 300);
        });
    }

    async postJob(jobData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newJob = {
                    id: this.jobs.length + 1,
                    ...jobData,
                    postedTime: "Just now",
                    proposals: 0,
                    company: "My Company", // Default for now
                    location: "Remote"
                };
                this.jobs.unshift(newJob);
                resolve({ success: true, job: newJob });
            }, 800);
        });
    }

    async applyForJob(jobId, applicationData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const application = {
                    id: this.applications.length + 1,
                    jobId: parseInt(jobId),
                    ...applicationData,
                    status: 'Pending',
                    appliedAt: new Date().toISOString()
                };
                this.applications.push(application);
                
                // Update proposal count
                const jobIndex = this.jobs.findIndex(j => j.id === parseInt(jobId));
                if(jobIndex !== -1) {
                    this.jobs[jobIndex].proposals += 1;
                }

                resolve({ success: true, application });
            }, 1000);
        });
    }
}

export const jobController = new JobController();

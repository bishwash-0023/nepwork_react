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
        this.proposals = [
            {
                id: 1,
                jobId: 1,
                freelancerName: "Alice Dev",
                freelancerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBecCzAzBEe41DuGoY03sthZ5A2jPjw8XN3_QFW6k2cTf14L8G7hzm5JLbLRzZI9U9y4KE2d_vZP89W5PQmVbONX8_thYUzzTDt0RoFSwli5wzn0BMeVVet2yfBmMHVrx_71vnMTeFh6lYEKm7kLBJDGkcDun8dFKEZucM1merHiASX-lQf599972CLQhRXsrEuJIOm7NkxBnBTJChYYyzfLxbrC6c9Oaodb0yI2HKUahd6s0N9QK5hG09qJLPxOfAEb5Jm2LOfZ-6w",
                rating: 4.8,
                reviews: 45,
                bidAmount: 4800,
                coverLetter: "I have 6 years of experience in React and have built similar dashboards.",
                skills: ["React", "Redux", "Node.js"],
                status: "Pending"
            },
            {
                id: 2,
                jobId: 1,
                freelancerName: "Bob Coder",
                freelancerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh-aiNcCW5cqRtzstE3mQpmMhrw19H3dz-qO9bjqQM7WVWzUQvanGYDW8wCzm0W8-INMC3Ok5Olf91gEwOpiLfsqhHiJeBaAZamCr7_i4siDDvmJap_Wt0E6TGxF7bgaUwZozw2ONkc6Fil3e3TPVIpkdBjNRm6HVib4i0wF0VB20BubcXIWIOThphzFHrYtokWeOLXzufBikyKxHG2v-XJ8CXBQ33H63UdcgXH1LYYzawA8whQbkQi_QZ-gf979vkebTHvmGoHpMt",
                rating: 4.5,
                reviews: 20,
                bidAmount: 4500,
                coverLetter: "I am a full-stack developer with a focus on performance.",
                skills: ["React", "TypeScript", "AWS"],
                status: "Pending"
            },
            {
                id: 3,
                jobId: 1,
                freelancerName: "Charlie Design",
                freelancerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTsD7VPifNUR9klSEyzvfL7WnyM6L_BjOvZMbGwcdA6AOsJHSoJb7T0_oY7ltm09FbujZLxzUdNzW_GbCkuQtWO5o5hGExplfdK46BNFaCnmrlISQ7F5-84iA6_kGoe9tT-BW7CNgUEtmuF1JiZKzRHwIY2A-T3KHx-9qQlpqrDgU0m3Dnuf5kpSNnZBvYUsVVrVYZgVDyOGu1goqDXLjZnqYqe_pdbtshSHcR9Gi78k7iMWUfuS6713NJlzZGVj5RtQyTkDxHVIIf",
                rating: 4.9,
                reviews: 80,
                bidAmount: 5200,
                coverLetter: "Top rated developer. I guarantee quality work.",
                skills: ["React", "Next.js", "Tailwind"],
                status: "Shortlisted"
            }
        ];
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
                         return job.budget >= parseInt(filter.minBudget);
                    });
                }

                resolve(filteredJobs);
            }, 500);
        });
    }

    async getMyJobs() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Return jobs posted by "My Company" or created by the user
                // For demo, we'll return a mix of the dummy jobs and any new ones
                const myJobs = this.jobs.filter(job => job.company === "My Company" || job.id === 1); // Mocking ID 1 as my job too for demo
                resolve(myJobs);
            }, 500);
        });
    }

    async getProposals(jobId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const jobProposals = this.proposals.filter(p => p.jobId === parseInt(jobId));
                resolve(jobProposals);
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
                    company: "My Company",
                    location: "Remote",
                    featured: false
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
                    id: this.proposals.length + 1,
                    jobId: parseInt(jobId),
                    freelancerName: "Current User", // Mock
                    freelancerAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHaddvfg_K9JEOqKP2DbvFtKKvhyDsdf0P-DP2icTIlilDL8phFUbyEz0u5LCf7TZFs3-vZ11LnrqUXqBqixS5d8Qahv6GnTiI0UhcY1toVLO2CydfcNvdEhK5FZLur6G5DP4RjcHCPkFF8aoPk8ZDrUJjMs7hEJm2g6UYfmZpMlPzw6O-YPr640EpG9DYmR0HAMZCs2ujx_LIJceDDWVvni1MKKfTAJNTWexBhIaT8Ncs9uWZd_cXSYQVzSXDk3RNsdg92Jq5mERA",
                    rating: 0,
                    reviews: 0,
                    ...applicationData,
                    status: 'Pending',
                    appliedAt: new Date().toISOString()
                };
                this.proposals.push(application);
                
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

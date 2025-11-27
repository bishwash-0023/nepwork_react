class UserController {
    constructor() {
        this.users = [
            {
                id: 1,
                name: "Admin User",
                role: "Client",
                title: "Product Manager at Tech Corp",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfz8p8eP5iZ39YMJJpi1Q6qIciYkSvTfIS1CJjzEfFF6R2ZxZTRdLRtzyTYcOhqQK_yAPJyIrtkNBPV66MFA9riLk4f4IPYd6-U705D-LYc2Bc7KiqIJMv42L9f5m14plVZvWFokYIMqObO0q4JsA4QU_-6X7bh2tJauWJWL4Npst9xELgCJPzZqnrOF6NiMEP2_PQWMnYvCTjxElEIY0rd2mHZl-waKX7LQeIFsH6AcX-eIr8Bmn59NVC1761qH5nOP1597ATyiVl",
                bio: "Experienced Product Manager with a demonstrated history of working in the computer software industry. Skilled in Agile Methodologies, Product Development, and User Experience.",
                location: "San Francisco, CA",
                rating: 4.9,
                reviews: 15,
                joined: "September 2021",
                skills: ["Product Management", "Agile", "Scrum"],
                jobsPosted: 12,
                totalSpent: "$50k+"
            },
            {
                id: 2,
                name: "David Miller",
                role: "Freelancer",
                title: "Senior UI/UX Designer",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBecCzAzBEe41DuGoY03sthZ5A2jPjw8XN3_QFW6k2cTf14L8G7hzm5JLbLRzZI9U9y4KE2d_vZP89W5PQmVbONX8_thYUzzTDt0RoFSwli5wzn0BMeVVet2yfBmMHVrx_71vnMTeFh6lYEKm7kLBJDGkcDun8dFKEZucM1merHiASX-lQf599972CLQhRXsrEuJIOm7NkxBnBTJChYYyzfLxbrC6c9Oaodb0yI2HKUahd6s0N9QK5hG09qJLPxOfAEb5Jm2LOfZ-6w",
                bio: "I create user-friendly and aesthetically pleasing designs. With 8 years of experience, I help startups and established companies build products that users love.",
                location: "London, UK",
                rating: 4.8,
                reviews: 120,
                joined: "January 2020",
                skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
                hourlyRate: "$65/hr",
                jobsCompleted: 85
            },
            {
                id: 3,
                name: "Sarah Chen",
                role: "Freelancer",
                title: "Full Stack Developer",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh-aiNcCW5cqRtzstE3mQpmMhrw19H3dz-qO9bjqQM7WVWzUQvanGYDW8wCzm0W8-INMC3Ok5Olf91gEwOpiLfsqhHiJeBaAZamCr7_i4siDDvmJap_Wt0E6TGxF7bgaUwZozw2ONkc6Fil3e3TPVIpkdBjNRm6HVib4i0wF0VB20BubcXIWIOThphzFHrYtokWeOLXzufBikyKxHG2v-XJ8CXBQ33H63UdcgXH1LYYzawA8whQbkQi_QZ-gf979vkebTHvmGoHpMt",
                bio: "Passionate developer with expertise in the MERN stack. I love solving complex problems and writing clean, maintainable code.",
                location: "Toronto, Canada",
                rating: 5.0,
                reviews: 42,
                joined: "March 2022",
                skills: ["React", "Node.js", "MongoDB", "Express"],
                hourlyRate: "$80/hr",
                jobsCompleted: 30
            },
            {
                id: 4,
                name: "Michael Brown",
                role: "Freelancer",
                title: "Content Writer & SEO Specialist",
                avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTsD7VPifNUR9klSEyzvfL7WnyM6L_BjOvZMbGwcdA6AOsJHSoJb7T0_oY7ltm09FbujZLxzUdNzW_GbCkuQtWO5o5hGExplfdK46BNFaCnmrlISQ7F5-84iA6_kGoe9tT-BW7CNgUEtmuF1JiZKzRHwIY2A-T3KHx-9qQlpqrDgU0m3Dnuf5kpSNnZBvYUsVVrVYZgVDyOGu1goqDXLjZnqYqe_pdbtshSHcR9Gi78k7iMWUfuS6713NJlzZGVj5RtQyTkDxHVIIf",
                bio: "I write engaging content that ranks. From blog posts to technical documentation, I can handle it all.",
                location: "Sydney, Australia",
                rating: 4.7,
                reviews: 200,
                joined: "May 2019",
                skills: ["SEO", "Copywriting", "Blogging", "Technical Writing"],
                hourlyRate: "$40/hr",
                jobsCompleted: 150
            }
        ];
    }

    async getUser(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.users.find(u => u.id === parseInt(id)));
            }, 300);
        });
    }
}

export const userController = new UserController();

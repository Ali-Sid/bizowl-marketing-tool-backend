import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_MARKETING_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function ask(
  companyName,
  companyDescription,
  goals,
  targetAudience,
  channels
) {
  try {
    const marketingContext = `
    I want you act as marketing planner and help me build this marketing plan for a client. We have to make it look professional. It should not sound like it is build an AI, I am giving you the framework you need to follow. You need to give the out in the desired format. I am providing you the format for the output. You need to follow that. - Here are the details you need to build this marketing tool. And give the output in second person.
    The business name is this ${companyName} and this what they do ${companyDescription}. The main goal of startup is, the main goal the founder is trying to achieve is this ${goals}. This is their target audience ${targetAudience} and these are their desirable marketing channel ${channels}. 
    Now on the basis of above query. Build a marketing plan in this formate and framework. - •  Executive Summary (overview of business and goals)
    •  Customer Personas (detailed description of target audience)
    Content Strategy  
     Channel Strategy (content suggestions, frequency, and platforms)
    SEO & Paid Ad Strategy (recommendations for search engine optimization and paid ads)
    Suggest that if they are looking to get better outcome they should book bizowl’s service and link is this – https://bizzowl.com/services/startup-consultation
    And the proper output< I expect from you in second person is  this – follow this and build a solid marketing plan - Marketing Plan for [Business Name]
    1. Executive Summary
    [Business Name] is a [brief description of the business, such as a small eco-friendly home products store or tech startup] that aims to [state the core business objective, such as "bring sustainable and eco-friendly products to urban households"]. The goal of this marketing plan is to grow brand awareness, increase website traffic by 20%, and drive online sales by leveraging a combination of content marketing, SEO, and paid advertising strategies.
    Key Business Goals:
    •	Grow brand awareness: Increase visibility across social media platforms by 30% within the next 6 months.
    •	Increase online sales: Boost website conversions by 15% through targeted advertising and SEO optimization.
    •	Customer retention: Build a loyal customer base by improving email marketing and retention strategies.
    2. Customer Personas
    Persona 1: Eco-conscious Emily
    •	Age: 28
    •	Location: Urban, metropolitan areas
    •	Occupation: Marketing professional
    •	Interests: Sustainable living, organic products, minimalist lifestyle
    •	Motivations: Emily values environmentally friendly products and enjoys supporting ethical brands. She frequently shops at Whole Foods and follows eco-influencers on Instagram.
    •	Challenges: She is often concerned about the authenticity of eco-friendly claims and prefers brands that provide transparency about their product sourcing.
    Persona 2: Budget-conscious Ben
    •	Age: 35
    •	Location: Suburban areas
    •	Occupation: Accountant
    •	Interests: DIY home improvements, saving money while maintaining quality
    •	Motivations: Ben is always looking for high-quality products that align with his budget. He loves deals and discounts and relies heavily on customer reviews before making a purchase.
    •	Challenges: He tends to wait for discounts and promotions before making a buying decision. (note: Give maximum of 2 personas, not more than 2)
    3. Content Strategy
    Your content strategy should revolve around educating and engaging your audience about eco-friendly practices, product benefits, and how your brand stands out. Use blog posts, how-to guides, infographics, and customer testimonials.
    Content Ideas:
    •	Weekly blog posts: Topics like "Top 10 Ways to Live an Eco-Friendly Lifestyle on a Budget" or "The Benefits of Using Organic Home Products."
    •	Social media content: Share user-generated content (e.g., customer reviews, photos of products in use) and eco-friendly tips.
    •	Video content: Create short, engaging videos on Instagram and YouTube showcasing your products and their impact on the environment.
    4. Channel Strategy
    Social Media (Instagram, Facebook)
    •	Frequency: Post 3 times a week on Instagram, once a week on Facebook
    •	Content Focus: Use Instagram to showcase eco-conscious customer stories and product highlights. Facebook can be used for community-building and sharing educational content.
    Email Marketing
    •	Frequency: Bi-weekly newsletters
    •	Content Focus: Send product promotions, eco-tips, and exclusive discount offers. Highlight product transparency and sustainability stories.
    Blog
    •	Frequency: 1 blog post per week
    •	Content Focus: Informative articles on sustainable living, product guides, and DIY eco-projects.
    5. SEO & Paid Ad Strategy
    SEO Strategy:
    •	On-page SEO: Optimize website content with keywords like “eco-friendly home products” and “sustainable living” to improve organic search rankings.
    •	Backlink building: Reach out to eco-lifestyle blogs and sustainable influencers for guest posts and backlinks to your site.
    •	Local SEO: If you have a physical store, ensure your Google My Business profile is optimized, and gather reviews to rank higher for local searches.
    Paid Advertising Strategy:
    •	Google Ads: Run targeted search ads for high-intent keywords like “buy eco-friendly home products” or “sustainable home essentials.” Use remarketing ads to reach customers who have visited your site but haven’t purchased.
    •	Facebook & Instagram Ads: Leverage carousel ads to showcase multiple products, targeting eco-conscious users and people who are likely to engage with environmental causes.
    •	Budget: Start with a monthly ad spend of $500 across both Google and Facebook Ads, testing different audiences and ad formats. Adjust based on performance.
    To get the most out of your marketing strategy and ensure it aligns with your business objectives, we recommend booking a consultation with Bizowl for personalized guidance. Our experts can help optimize every aspect of your plan for better results.
    Book your consultation here: Startup Consultation Service by Bizowl
`;

    // const marketingContext = `(Note: Display content only related to marketing and growth strategies and tactics for the business ${businessName}, which is described as: ${businessDescription}, Target Audience: ${targetAudience}, Current Challenges: ${currentChallenges}, Goals and Objectives: ${goals}, Preferred Channels: ${preferredChannels}, Timeframe: ${timeframe}, Additional Notes: ${additionalNotes}. also give insights on what's going wrong with ${businessName} and where is it lacking. present it in this format: Summary(give summary for ${businessName}'s generated marketing strategy), Detailed Plan, SWOT analysis, visual representation(graphs, charts) (here provide some numerical data so that i can represent this in charts and graphs which includes forecast, current situation, any market trends, and where does this business stands, etc..) ) Marketing and Growth Strategy: `;
    const modifiedPrompt = marketingContext;

    const result = await model.generateContent(modifiedPrompt);

    if (
      !result.response ||
      !result.response.candidates ||
      result.response.candidates.length === 0
    ) {
      console.error("Unexpected response:", result);
      return "An error occurred while generating a response.";
    }

    const answer = result.response.candidates[0].content;
    return answer;
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred.";
  }
}

// Export the "ask" function
export { ask };

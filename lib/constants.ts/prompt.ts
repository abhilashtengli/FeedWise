// export const customerFeedbackPrompt = (
//   productName: string,
//   productCategory: string,
//   countryOfSale: string
// ) => `
//     Act as **Customer Feedback Analyst** expert and Your task is to analyze bulk customer reviews and generate structured reports in JSON format.
   
//     ### **Important Guidelines**:
//     - Ensure all **property names** and **values** are enclosed in **double quotes**.
//     - JSON **must be valid**. Make sure there are **no trailing commas**.
//     - If a key is a string, it must be wrapped in double quotes.
//     - If a value is a string, it must also be wrapped in double quotes.
//     - After every key-value pair, ensure a **comma** separates them unless it’s the last pair in an object or array.
//     - Compulsorily you must provide all the below 9 reports (even if no data exists for a report, return an empty array, empty object, or a "skipped" message for that report)

//     Product details: {
//      "productName": "${productName}",
//      "productCategory": "${productCategory}",
//      "countryOfSale": "${countryOfSale}"
//      }
    
//     ### **Input Validation:**
//     Before processing, check if the input contains meaningful customer reviews.
//     If the input lacks valid feedback (e.g., random characters, empty text, gibberish or irrelevant data), return:
//     {
//       "reportStatus": "error",
//       "reportMessage": "Invalid input. Please provide actual customer reviews for analysis.",
//       "reports": null
//     }
//     ### **Reports to Generate (if input is valid):**
//     - If the input is valid, generate reports in JSON format as follows:
//     {
//       "reportStatus": "success",
//       "reportMessage": "Here is the report",
//       "reports": [] In this add all the below 9 reports with their key & value
//     },
//     1. **Sentiment Analysis Report (R1)**
//     - Analyze customer sentiment accurately, accounting for mixed emotions and sarcasm.
//     - Provide percentages of positive, neutral, and negative sentiments.
//      Example :
//     {
//       "report": "R1",
//       "positive": "62%",
//       "neutral": "25%",
//       "negative": "13%"
//     }
//     2. **Key Themes and Topics Extraction (R2)**
//     - Extract most mentioned topics based on predefined categories (e.g., product features, pricing, delivery or can be anything valid topics).
//     - Include only topics with at least 5% occurrence.
//     Example :
//      {
//       "report": "R2",
//       "mostMentionedTopics": [
//         {"topic": "Topic name", "percentage": "45%"},
//         {"topic": "Topic name", "percentage": "30%"},
//       ]
//     }
//     3. **Improvement Suggestions Report (R3)**
//     - Generate actionable suggestions linked to recurring complaints (e.g., mentioned by at least 10% of reviews).
//     Example :
//     {
//       "report": "R3",
//       "suggestions": [
//         "Improve delivery speed",
//         "Offer better post-purchase support",
//         "Enhance product durability"
//       ]
//     }
//     4. **Comparative Analysis Report (R4)**
//     - Highlight product ratings and strengths/weaknesses compared to competitors if external data is provided
//     - If competitor data is unavailable for the product, use market averages based on external sources.
//     - If competitor data is completely unavailable for the product then give the response as :
//       {
//         "report": "R4",
//         "message": "Comparative data unavailable. Report skipped."
//        }
//     Example :
//     {
//       "report": "R4",
//       "myProductRating": 4.2,
//       "overAllCompetitorRating": 4.5,
//       "MyProductStrengths": ["Better quality", "User-friendly design"],
//       "NeedsImprovement": ["Pricing slightly higher than competitors", "Better packaging"]
//     }
     

//     5. **Customer Satisfaction Score (R5)**
//     - Calculate a satisfaction score from valid ratings and feedback.
//     Example :
//     {
//       "report": "R5",
//       "SatisfactionScore": "8.1/10"
//     }
//     6. **Trend Analysis Report (R6)**
//     - Identify trending positive and negative feedback.
//     Example :
//     {
//       "report": "R6",
//       "trendingPositive": [
//         {"Customers love the new design": "15%"},
//         {"Customers satisfied with packaging": "46%"}
//       ],
//       "trendingNegative": [
//         {"Delivery delays have increased complaints": "8%"},
//         {"Too expensive": "14%"}
//       ]
//     }
//     7. **Competitive Benchmarking Report (R7)**
//     - Compare product ratings and performance with market averages.
//     - If competitor data is completely unavailable for the product then give the response as :
//       {
//         "report": "R4",
//         "message": "Comparative data unavailable. Report skipped."
//        }
//       else
//     Example :
//     {
//       "report": "R7",
//       "marketAvgRating": "4.0/5",
//       "yourProduct": "4.2/5",
//       "points": [
//         "You are **above average** in product quality",
//         "Below competitors in **customer service response time**"
//       ]
//     }
//     8. **Response Strategy Development (R8)**
//     - Provide response strategies for negative, neutral, and positive reviews.
//     Example :
//     {
//       "report": "R8",
//       "RecommendedActions": {
//         "negativeReviews": "Apologize, offer compensation, and improve issue resolution speed.",
//         "positiveReviews": "Encourage customer advocacy & referrals.",
//         "neutralReviews": "Seek more feedback to understand concerns."
//       }
//     }
//     9. **Customer Complaints List (R9)**
//     - Generate a list of specific customer complaints  (maximum 5).
//     - If no complaints exist, return an empty list.
//     Example :
//     {
//       "report": "R9",
//       "customerComplaints": [
//         "Complaint1",
//         "Complaint2",
//         "Complaint3"
//     ]
//      }
//     - Compulsorily generate all 9 reports. If data is unavailable for a report, return an empty array, empty object, or a "skipped" message for that report.
//     - If there are any personal or sensitive topics please avoid answering those questions.`;

const mainPrompt = (
  productName: string,
  productCategory: string,
  countryOfSale: string
) =>
  ` Act as **Customer Feedback Analyst** expert and Your task is to analyze bulk customer reviews and generate structured reports in JSON format.
   
    ### **Important Guidelines**:
    - Ensure all **property names** and **values** are enclosed in **double quotes**.
    - JSON **must be valid**. Make sure there are **no trailing commas**.
    - If a key is a string, it must be wrapped in double quotes.
    - If a value is a string, it must also be wrapped in double quotes.
    - After every key-value pair, ensure a **comma** separates them unless it’s the last pair in an object or array.
    - Compulsorily you must provide all the below 9 reports (even if no data exists for a report, return an empty array, empty object, or a "skipped" message for that report)

    Product details: {
     "productName": "${productName}",
     "productCategory": "${productCategory}",
     "countryOfSale": "${countryOfSale}"
     }
    
    ### **Input Validation:**
    Before processing, check if the input contains meaningful customer reviews.
    If the input lacks valid feedback (e.g., random characters, empty text, gibberish or irrelevant data), return:
    {
      "reportStatus": "error",
      "reportMessage": "Invalid input. Please provide actual customer reviews for analysis.",
      "reports": null
    }
    ### **Reports to Generate (if input is valid):**
    - If the input is valid, generate reports in JSON format as follows:
    {
      "reportStatus": "success",
      "reportMessage": "Here is the report",
      "reports": [] In this add all the reports with their key & value
    },`;

const footerPrompt = `
    - Compulsorily generate all the above 3 reports. If data is unavailable for a report, return an empty array, empty object, or a "skipped" message for that report.
    - If there are any personal or sensitive topics please avoid answering those questions.`;

export const promptBatch01 = `
"${mainPrompt}"
 1. **Sentiment Analysis Report (R1)**
    - Analyze customer sentiment accurately, accounting for mixed emotions and sarcasm.
    - Provide percentages of positive, neutral, and negative sentiments.
     Example :
    {
      "report": "R1",
      "positive": "62%",
      "neutral": "25%",
      "negative": "13%"
    }
    2. **Key Themes and Topics Extraction (R2)**
    - Extract most mentioned topics based on predefined categories (e.g., product features, pricing, delivery or can be anything valid topics).
    - Include only topics with at least 5% occurrence.
    Example :
     {
      "report": "R2",
      "mostMentionedTopics": [
        {"topic": "Topic name", "percentage": "45%"},
        {"topic": "Topic name", "percentage": "30%"},
      ]
    }

    3. **Improvement Suggestions Report (R3)**
    - Generate actionable suggestions linked to recurring complaints (e.g., mentioned by at least 10% of reviews).
    Example :
    {
      "report": "R3",
      "suggestions": [
        "Improve delivery speed",
        "Offer better post-purchase support",
        "Enhance product durability"
      ]
    }
        "${footerPrompt}"
`;
export const promptBatch02 = `
 "${mainPrompt}
  1. **Customer Satisfaction Score (R4)**
    - Calculate a satisfaction score from valid ratings and feedback.
    Example :
    {
      "report": "R4",
      "SatisfactionScore": "8.1/10"
    }
  2. **Trend Analysis Report (R5)**
    - Identify trending positive and negative feedback.
    Example :
    {
      "report": "R5",
      "trendingPositive": [
        {"Customers love the new design": "15%"},
        {"Customers satisfied with packaging": "46%"}
      ],
      "trendingNegative": [
        {"Delivery delays have increased complaints": "8%"},
        {"Too expensive": "14%"}
      ]
    }
  3. **Response Strategy Development (R6)**
    - Provide response strategies for negative, neutral, and positive reviews.
    Example :
    {
      "report": "R6",
      "RecommendedActions": {
        "negativeReviews": "Apologize, offer compensation, and improve issue resolution speed.",
        "positiveReviews": "Encourage customer advocacy & referrals.",
        "neutralReviews": "Seek more feedback to understand concerns."
      }
    }
        "${footerPrompt}"
`;
export const promptBatch03 = `
"${mainPrompt}"
  1. **Customer Complaints List (R7)**
    - Generate a list of specific customer complaints  (maximum 5).
    - If no complaints exist, return an empty list.
    Example :
    {
      "report": "R7",
      "customerComplaints": [
        "Complaint1",
        "Complaint2",
        "Complaint3"
    ]
     }
 2.  ** Feature Request Analysis (R8)**
 -  Identify features or improvements requested by customers.
 Example : 
 {
   "report": "R8",
   "featureRequests": [
     {"feature": "Larger package size", "percentage": "25%"},
     {"feature": "More flavor options", "percentage": "18%"}
   ]
   }
 3. **Emotional Tone Analysis (R9)**
 Analyze the emotional tone of the feedback (e.g., happy, frustrated, disappointed).
  Example : 
  {
   "report": "R9",
   "emotionalTone": [
     {"tone": "Happy", "percentage": "65%"},
     {"tone": "Frustrated", "percentage": "20%"},
     {"tone": "Disappointed", "percentage": "15%"}
   ]
 }
     "${footerPrompt}"
`;
export const promptBatch04 = `
"${mainPrompt}"
 1.  **Customer Loyalty Insights (R10)**
 - Identify feedback that indicates customer loyalty or repeat purchases.
 Example : 
 {
   "report": "R10",
   "loyaltyInsights": [
     {"insight": "Repeat customers", "percentage": "45%"},
     {"insight": "Customers willing to recommend", "percentage": "70%"}
   ]
 }
   2. **Feedback Length Analysis (R11)**
 - Analyze the length of feedback to identify detailed vs. brief reviews.
 Example : 
  {
   "report": "R11",
   "feedbackLength": [
     {"length": "Detailed (100+ words)", "percentage": "30%"},
     {"length": "Brief (less than 50 words)", "percentage": "70%"}
   ]
 }
    - Compulsorily generate all the above 2 reports. If data is unavailable for a report, return an empty array, empty object, or a "skipped" message for that report.
    - If there are any personal or sensitive topics please avoid answering those questions.`;

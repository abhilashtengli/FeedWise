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

// You are an AI Feedback Assistant with START, PLAN, ACTION, observation and output State
// // Wait for the user feedbacks
// const mainPrompt = (
//   productName: string,
//   productCategory: string,
//   countryOfSale: string
// ) =>
//   `
//   **ROLE**: AI Feedback Assistant
//   **TASK**: Analyze customer reviews through structured thinking process

//   # START: Initialization
// 1. **Task Acknowledgement**:
//    "I will analyze customer feedback for ${productName} (${productCategory}) sold in ${countryOfSale} through systematic processing"

// 2. **Input Validation**:
//    - Check for meaningful English text in input
//    - Verify presence of actual product-related feedback
//    - Detect and flag gibberish/irrelevant data
//    If the input lacks valid feedback (e.g., random characters, empty text, gibberish or irrelevant data),
//     return:
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
//       "reports": [] In this add all the reports with their key & value
//     },`;

// const footerPrompt = `
//     - Compulsorily generate all the above 3 reports. If data is unavailable for a report, return an empty array, empty object, or a "skipped" message for that report.
//     - If there are any personal or sensitive topics please avoid answering those questions.`;

const promptJsonValidation = `
**STRICT JSON STRUCTURE**:
1. ALL objects/arrays must use SINGLE-LINE format
2. NO line breaks between properties
3. NO indentation anywhere
4. ONE space after colons
5. Keep quotes consistent
`;

export const promptBatch01 = (
  productName: string,
  productCategory: string,
  countryOfSale: string
) => `

**ROLE**: AI Feedback Assistant
  **TASK**: Analyze customer reviews through structured thinking process

  # START: Initialization
  1. **Task Acknowledgement**:
   "I will analyze customer feedback for ${productName} (${productCategory}) sold in ${countryOfSale} through systematic processing"

  2. **Input Validation**:
   - Check for meaningful English text in input
   - Verify presence of actual product-related feedback
   - Detect and flag gibberish/irrelevant data
     If the input lacks valid feedback (e.g., random characters, empty text, gibberish or irrelevant data), 
     return:
     {
      "reportStatus": "error",
      "reportMessage": "Invalid input. Please provide actual customer reviews for analysis.",
      "reports": null
     }
  

  # PLAN: Strategy Formulation
  **Processing Blueprint**:
  1. Will perform sentiment analysis (R1) using VADER with sarcasm detection
  2. Extract key themes (R2) using TF-IDF and topic modeling
  3. Generate suggestions (R3) through pattern recognition in complaints
  4. Cross-verify all outputs with 90% confidence threshold
  5. Mandatory inclusion of all reports (empty if no data)
  
  # ACTION: Execution Phase
  ## STEP 1: Sentiment Analysis (R1)
  - Process: 
  a. Analyze each review with emotion detection
  b. Categorize as Positive/Neutral/Negative
  c. Calculate percentages with confidence scores
  - Validation:
  ↳ If <10 reviews, flag as "Insufficient data"
  ↳ Verify sentiment consistency across similar phrases
  ↳ Sum must be 100% ±2%
     Example :
    {
      "report": "R1",
      "positive": "62%",
      "neutral": "25%",
      "negative": "13%"
    }
 ## STEP 2: Theme Extraction (R2)
- Process:
  a. Identify noun phrases and action verbs
  b. Cluster related terms (e.g., "slow delivery" = "Shipping Speed")
  c. Apply 5% occurrence threshold
- Validation:
  ↳ Exclude non-product related topics
  ↳ Merge similar categories (e.g., "packaging" + "box condition")
  ↳ percentages represent relative weight of TOP topics only (sum may be <100%)
    Example :
     {
      "report": "R2",
      "mostMentionedTopics": [
        {"topic": "Topic name", "percentage": "45%"},
        {"topic": "Topic name", "percentage": "30%"},
      ]
    }
 ## STEP 3: Improvement Suggestions (R3)
- Process:
  a. Map complaints to potential solutions
  b. Prioritize issues with ≥10% frequency
  c. Formulate actionable recommendations
- Validation:
  ↳ Exclude suggestions requiring personal data
  ↳ Ensure technical feasibility
    Example :
    {
      "report": "R3",
      "suggestions": [
        "Improve delivery speed",
        "Offer better post-purchase support",
        "Enhance product durability"
      ]
    }

# OBSERVATION: Quality Check
- Verify JSON syntax with online validator
- Confirm all percentages sum to 100% ±2% margin
- Check for country-specific cultural factors
- Note any skipped reports with reasons

# OUTPUT STATE: Final Generation
**REQUIRED FORMAT**: (You must strictly follow the Json Output format)
{
  "reportStatus": "success"|"error",
  "reportMessage": "Status details",
  "reports":  [
    {
      "report": "R1",
      "positive": "62%",
      "neutral": "25%",
      "negative": "13%"
    },
    {
      "report": "R2",
      "mostMentionedTopics": [
        {"topic": "Text", "percentage": "X%"}
      ]
    },
    {
      "report": "R3",
      "suggestions": ["Text"]
    }
  ]
}
  **STRICT RULES**:
1. All strings double-quoted
2. No trailing commas
3. Empty arrays for missing data
4. Percentages as strings with "%"
5. Error if <3 meaningful reviews
6. Validate with JSONLint before responding
7. Avoid special characters (&, <, >) in topic names

${promptJsonValidation}
Product Context:
${JSON.stringify({ productName, productCategory, countryOfSale }, null, 2)}
\n\nRETURN ONLY THE JSON OUTPUT FROM # OUTPUT STATE. NO MARKDOWN. NO CODE BLOCKS. NO EXPLANATIONS. NO OTHER TEXT. STRICTLY FOLLOW THE REQUIRED FORMAT. VALIDATE JSON SYNTAX BEFORE RESPONDING
`;

export const promptBatch02 = (
  productName: string,
  productCategory: string,
  countryOfSale: string
) => `
**ROLE**: AI Feedback Strategist
**TASK**: Comprehensive review analysis with response planning

# START: Initialization
1. **Task Acknowledgement**:
   "Analyzing ${productName} (${productCategory}) feedback in ${countryOfSale} for strategic insights"

2. **Input Validation**:
   - Minimum 15 reviews required for trend analysis
   - Flag non-English/textual feedback
   - Reject if <5 numerical ratings for R4

# PLAN: Strategy Formulation
**Processing Blueprint**:
1. Satisfaction Scoring (R4) - Weighted average of ratings + sentiment
2. Trend Detection (R5) - Temporal analysis + cluster comparison
3. Response Planning (R6) - Culture-aware strategy development
4. Confidence threshold: 85% for all outputs

# ACTION: Execution Phase
## STEP 4: Satisfaction Scoring (R4)
- Process:
  a. Convert ratings to 10-point scale
  b. Weighted average (70% ratings, 30% sentiment)
  c. Format as X.X/10
- Validation:
  ↳ Use text feedback if ratings <5
  ↳ Flag if confidence <85%

  Example:
  {
    "report": "R4",
    "satisfactionScore": "8.2/10",
    "confidenceLevel": "87%"
  }

## STEP 5: Trend Analysis (R5)
- Process:
  a. Compare monthly feedback clusters
  b. Identify >5% MoM changes
  c. Extract trending phrases
- Validation:
  ↳ Require ≥3 mentions of same trend
  ↳ Exclude seasonal patterns

  Example:
  {
    "report": "R5",
    "trendingPositive": [
      {"trend": "Ergonomic design", "mentions": "18%"},
      {"trend": "Eco-friendly packaging", "mentions": "27%"}
    ],
    "trendingNegative": [
      {"trend": "Battery lifespan", "mentions": "12%"},
      {"trend": "Mobile app compatibility", "mentions": "9%"}
    ]
  }

## STEP 6: Response Strategies (R6)
- Process:
  a. Categorize feedback by sentiment
  b. Match to cultural response norms
  c. Create tiered action plans
- Validation:
  ↳ Localize compensation offers
  ↳ Ensure GDPR compliance

  Example:
  {
    "report": "R6",
    "recommendedActions": {
      "negative": [
        "Implement extended warranty for battery issues",
        "Create dedicated technical support team"
      ],
      "neutral": [
        "Introduce post-purchase survey",
        "Offer free accessory with next purchase"
      ],
      "positive": [
        "Launch referral rewards program",
        "Feature customer stories in marketing"
      ]
    }
  }

# OBSERVATION: Quality Check
1. Verify score calculation formula
2. Check trend statistical significance (p<0.05)
3. Validate response practicality
4. Ensure strategy localization

# OUTPUT STATE: Final Generation
**STRICT JSON FORMAT**:
{
  "reportStatus": "success",
  "reportMessage": "Strategic analysis complete",
  "reports": [
    {
      "report": "R4",
      "satisfactionScore": "X.X/10",
      "confidenceLevel": "X%"
    },
    {
      "report": "R5",
      "trendingPositive": [
        {"trend": "Text", "mentions": "X%"}
      ],
      "trendingNegative": [
        {"trend": "Text", "mentions": "X%"}
      ]
    },
    {
      "report": "R6",
      "recommendedActions": {
        "negative": ["Text"],
        "neutral": ["Text"],
        "positive": ["Text"]
      }
    }
  ]
}

**VALIDATION RULES**:
1. Scores rounded to first decimal
2. Trend mentions ≥5% of total feedback
3. Strategies must be executable within 30 days
4. All percentage values as strings
5. Empty arrays for missing trend categories

${promptJsonValidation}

Product Context:
${JSON.stringify({ productName, productCategory, countryOfSale }, null, 2)}
\n\nRETURN ONLY THE JSON OUTPUT FROM # OUTPUT STATE. NO MARKDOWN. NO CODE BLOCKS. NO EXPLANATIONS. NO OTHER TEXT. STRICTLY FOLLOW THE REQUIRED FORMAT. VALIDATE JSON SYNTAX BEFORE RESPONDING
`;

export const promptBatch03 = (
  productName: string,
  productCategory: string,
  countryOfSale: string
) => `
**ROLE**: Customer Experience Analyst
**TASK**: Deep dive into complaint patterns and emotional signals

# START: Initialization
1. **Task Acknowledgement**:
   "Analyzing ${productName} (${productCategory}) feedback in ${countryOfSale} for operational improvements"

2. **Input Validation**:
   - Minimum 20 reviews required for emotional analysis
   - Reject if <5 detailed complaints for R7
   - Flag non-specific feedback ("bad product" ≠ valid complaint)

# PLAN: Strategy Formulation
**Processing Blueprint**:
1. Complaint Extraction (R7) - Exact phrase mining
2. Feature Requests (R8) - Cluster similar suggestions
3. Emotional Tone (R9) - Plutchik's wheel of emotions
4. Minimum 3 mentions for inclusion

# ACTION: Execution Phase
## STEP 7: Complaint Extraction (R7)
- Process:
  a. Extract verbatim complaint phrases
  b. Remove duplicates with fuzzy matching (85% similarity)
  c. Prioritize most frequent
- Validation:
  ↳ Exclude general dissatisfaction statements
  ↳ Require specific product references

  Example:
  {
    "report": "R7",
    "customerComplaints": [
      "Battery drains within 2 hours",
      "Touchscreen unresponsive in cold weather",
      "Charging cable too short"
    ]
  }

## STEP 8: Feature Requests (R8)
- Process:
  a. Identify improvement suggestions
  b. Group semantically similar requests
  c. Calculate cluster percentages
- Validation:
  ↳ Exclude non-feature comments
  ↳ Merge regional variants (e.g., "colour" vs "color")

  Example:
  {
    "report": "R8",
    "featureRequests": [
      {"feature": "Wireless charging capability", "percentage": "32%"},
      {"feature": "Multi-device pairing", "percentage": "19%"}
    ]
  }

## STEP 9: Emotional Tone (R9)
- Process:
  a. Detect 8 core emotions (Joy, Trust, Fear, etc.)
  b. Calculate emotion intensity levels
  c. Aggregate dominant emotions
- Validation:
  ↳ Flag cultural expression differences
  ↳ Verify with sentiment cross-check

  Example:
  {
    "report": "R9",
    "emotionalTone": [
      {"tone": "Frustration", "percentage": "40%"},
      {"tone": "Anticipation", "percentage": "25%"},
      {"tone": "Disgust", "percentage": "15%"}
    ]
  }

# OBSERVATION: Quality Check
1. Verify complaint specificity
2. Test feature request clustering
3. Validate emotion-sentiment alignment
4. Ensure percentage totals = 100% ±5%

# OUTPUT STATE: Final Generation
**STRICT JSON FORMAT**:
{
  "reportStatus": "success",
  "reportMessage": "Operational insights generated",
  "reports": [
    {
      "report": "R7",
      "customerComplaints": ["Exact complaint text"]
    },
    {
      "report": "R8",
      "featureRequests": [
        {"feature": "Text", "percentage": "X%"}
      ]
    },
    {
      "report": "R9",
      "emotionalTone": [
        {"tone": "Text", "percentage": "X%"}
      ]
    }
  ]
}

**VALIDATION RULES**:
1. Complaints verbatim from reviews
2. Features must be product-related
3. Emotional tones from Plutchik's model
4. Empty arrays if no valid data
5. Max 5 complaints listed

${promptJsonValidation}

Product Context:
${JSON.stringify({ productName, productCategory, countryOfSale }, null, 2)}
\n\nRETURN ONLY THE JSON OUTPUT FROM # OUTPUT STATE. NO MARKDOWN. NO CODE BLOCKS. NO EXPLANATIONS. NO OTHER TEXT. STRICTLY FOLLOW THE REQUIRED FORMAT. VALIDATE JSON SYNTAX BEFORE RESPONDING
`;

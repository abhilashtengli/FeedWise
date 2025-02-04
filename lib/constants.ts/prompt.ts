const promptJsonValidation = `
**STRICT JSON STRUCTURE**:
1. ALL objects/arrays must use SINGLE-LINE format
2. NO line breaks between properties
3. NO indentation anywhere
4. ONE space after colons
5. Keep quotes consistent
6. ENSURE the response includes ALL reports without truncation.
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
6. NEVER use parentheses () in JSON keys
7. ALWAYS use concrete values - NO placeholder text (<...>)
8. Replace template text with actual analyzed data
9. Remove empty examples from final output
10. Use only exact keys from required format

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
  ↳ Complaints must reference a specific product aspect (e.g., 'Battery drains fast' vs. 'Bad product')

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
  c. Calculate percentage as : (mentions of feature request / total valid feedback) x 100
  d. Do NOT normalize percentages to sum to 100%
  e. Each feature's percentage is independent of others
- Validation:
  ↳ Exclude non-feature comments
  ↳ Merge regional variants (e.g., "colour" vs "color")
  ↳ Percentages should reflect actual frequency in the dataset
  ↳ If a feature is mentioned 10 times out of 100 reviews, its percentage is 10%
  ↳ If:- Total reviews = 100
       - "Wireless charging" mentioned 12 times → 12%
       - "Better battery" mentioned 8 times → 8%
       - "Larger screen" mentioned 5 times → 5%

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
  a. Detect and report all 8 core emotions (Joy, Trust, Fear, Surprise, Anger, Disgust, Sadness, Anticipation)
  b. Calculate emotion intensity levels
  c. Aggregate dominant emotions
- Validation:
  ↳ Flag cultural expression differences
  ↳ If an emotion is not present, explicitly set "percentage": "0%" instead of omitting it.
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
\n\nRETURN ONLY THE JSON OUTPUT FROM # OUTPUT STATE. NO MARKDOWN. NO CODE BLOCKS. NO EXPLANATIONS. NO OTHER TEXT. STRICTLY FOLLOW THE REQUIRED FORMAT. VALIDATE JSON SYNTAX BEFORE RESPONDING. Validate response length to ensure all required sections (R7, R8, R9) are fully included
`;

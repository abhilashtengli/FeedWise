# API Documentation

## User Authentication APIs:
- POST /api/auth/signup: Create a new user account.
- POST /api/auth/signin: Authenticate existing users.
- POST /api/auth/signout: Terminate user sessions.
- POST /api/auth/password-reset: Allow users to reset their passwords.

## Report Generation and Management APIs:
- POST /api/reports: Process the submitted feedback and generate a report using the GPT-4 API.
- GET /api/reports: Fetch all generated reports for the user.
- GET /api/reports/{id}: Retrieve a specific report by its ID.
- GET /api/reports/{id}/download: Allow users to download reports in PDF format


## Customer Feedback Management APIs:
- POST /api/feedback: Allow users to submit customer reviews or feedback.
- GET /api/feedback: Fetch all feedback submitted by the user.
- GET /api/feedback/{id}: Retrieve a specific feedback entry by its ID.
- PUT /api/feedback/{id}: Update an existing feedback entry.
- DELETE /api/feedback/{id}: Enable users to remove their feedback.


## Dashboard Data APIs:

- GET /api/dashboard: Retrieve data to display on the user's dashboard, such as feedback statistics and report summaries.


# UI info to show

```jsx
Generate a report for reviews/feedback with the following:
```

## **1. Sentiment Analysis Report**

📊 **Graph Type:** Pie Chart

- **Positive:** 62%
- **Neutral:** 25%
- **Negative:** 13%

```jsx
1. Sentiment Analysis Report (positive, neutral, negative %).
Output in JSON format with report key as "R1":
Example 
{
  "report": "R1",
  "positive": "62%",
  "neutral": "25%",
  "negative": "13%"
}
```

## **2. Key Themes and Topics Extraction**

📊 **Graph Type:** Word Cloud / Bar Chart

- **Most Mentioned Topics:**
    - **Quality** (45%)
    - **Price** (30%)
    - **Customer Service** (15%)
    - **Delivery Time** (10%)

```jsx
2. Key Themes and Topics Extraction (mention top topics with their percentages).
Output in JSON format with report key as "R2":
Example 
 {
  "report": "R2",
  "most_mentioned_topics": [
    {"topic": "Topic name", "percentage": "45%"},
    {"topic": "Topic name", "percentage": "30%"},
    {"topic": "Topic name", "percentage": "15%"},
    {"topic": "Topic name", "percentage": "10%"}
  ]
}
```

## **3. Improvement Suggestions Report**

📜 **Key Suggestions:**

- Improve delivery speed.
- Offer better post-purchase support.
- Enhance product durability.

```jsx
3. Improvement Suggestions Report (provide key suggestions).
Output in JSON format with report key as "R3":
Example 
{
  "report": "R3",
  "suggestions": [
    "Improve delivery speed",
    "Offer better post-purchase support",
    "Enhance product durability"
  ]
}
```

## **4. Comparative Analysis Report**

📊 **Graph Type:** Bar Chart / Radar Chart

- **Your Product Rating:** 4.2/5
- **Competitor A:** 4.5/5
- **Competitor B:** 3.9/5

🔍 **Your Strengths:** Better quality, user-friendly design.

⚠ **Needs Improvement:** Pricing slightly higher than competitors.

```jsx
4. Comparative Analysis Report (compare product ratings and strengths/weaknesses).
Output in JSON format with report key as "R4":
Example 
{
  "report": "R4",
  "myProductRating": 4.2,
  "overAllCompetitorRating": 4.5,
  "MyProductStrengths": ["Better quality", "User-friendly design"],
  "Needs Improvement": ["Pricing slightly higher than competitors", "Better packaging"]
}
```

## **5. Customer Satisfaction Score Generation**

📊 **Graph Type:** Line Chart / Gauge Chart

- **Satisfaction Score:** **8.1/10**

```jsx
5. Customer Satisfaction Score Generation (calculate satisfaction score).
Output in JSON format with report key as "R5":
Example
{
  "report": "R5",
  "Satisfaction Score": "8.1/10"
}
```

## **6. Trend Analysis Report**

📊 **Graph Type:** Line Chart / Area Chart

📈 **Trending Positively:**

- Customers love the **new design** (up 15%).

📉 **Trending Negatively:**

- **Delivery delays** have increased complaints by **8%**.

```jsx
6. Trend Analysis Report (identify trending positive and negative feedback).
Output in JSON format with report key as "R6":
Example
{
  "report": "R6",
  "trending_positive": [
    {"Customers love the new design": "15%"},
    {"Customers satisfied with packaging": "46%"}
  ],
  "trending_negative": [
    {"Delivery delays have increased complaints": "8%"},
    {"Too expensive": "14%"}
  ]
}
```

## **7. Competitive Benchmarking Report**

📊 **Graph Type:** Bar Chart / Radar Chart

- **Market Avg. Rating:** 4.0/5
- **Your Product:** 4.2/5

🔹 You are **above average** in product quality.

🔻 Below competitors in **customer service response time**.

```jsx
7. Competitive Benchmarking Report (compare product ratings and key points).
Output in JSON format with report key as "R7":
Example 
{
  "report": "R7",
  "marketAvgRating": "4.0/5",
  "your Product": "4.2/5",
  "points": [
    "You are **above average** in product quality",
    "Below competitors in **customer service response time**"
  ]
}
```

## **8. Response Strategy Development**

📜 **Recommended Actions:**

- **For Negative Reviews:** Apologize, offer compensation, and improve issue resolution speed.
- **For Positive Reviews:** Encourage customer advocacy & referrals.
- **For Neutral Reviews:** Seek more feedback to understand concerns.


## Prompt 

  `Act as **Customer Feedback Analyst** expert and Your task is to analyze bulk customer reviews :

**Customer Reviews:**
      ${cleanedReviews}
  Note : You must return a valid JSON object as I mentioned without extra text or formatting.
    Now generate structured reports based on these categories:
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
  "reports": [] //In this add all the below 9 reports with their key & value
}, 
1. **Sentiment Analysis Report (R1)**
   - Output positive, neutral, and negative feedback percentages. 
 Example :
{
  "report": "R1",
  "positive": "62%",
  "neutral": "25%",
  "negative": "13%"
}
2. **Key Themes and Topics Extraction (R2)**
- Extract the most mentioned topics and their percentage of occurrence.
Example :
 {
  "report": "R2",
  "most_mentioned_topics": [
    {"topic": "Topic name", "percentage": "45%"},
    {"topic": "Topic name", "percentage": "30%"},
    {"topic": "Topic name", "percentage": "15%"},
    {"topic": "Topic name", "percentage": "10%"}
  ]
}
3. **Improvement Suggestions Report (R3)**
- Provide key actionable suggestions. 
Example :  
{
  "report": "R3",
  "suggestions": [
    "Improve delivery speed",
    "Offer better post-purchase support",
    "Enhance product durability"
  ]
}
4. **Comparative Analysis Report (R4)**
- Compare product ratings and highlight strengths/weaknesses.
Example : 
{
  "report": "R4",
  "myProductRating": 4.2,
  "overAllCompetitorRating": 4.5,
  "MyProductStrengths": ["Better quality", "User-friendly design"],
  "Needs Improvement": ["Pricing slightly higher than competitors", "Better packaging"]
}
5. **Customer Satisfaction Score (R5)**
- Calculate and display the satisfaction score.
Example :
{
  "report": "R5",
  "Satisfaction Score": "8.1/10"
}
6. **Trend Analysis Report (R6)**
- Identify trending positive and negative feedback.
Example : 
{
  "report": "R6",
  "trending_positive": [
    {"Customers love the new design": "15%"},
    {"Customers satisfied with packaging": "46%"}
  ],
  "trending_negative": [
    {"Delivery delays have increased complaints": "8%"},
    {"Too expensive": "14%"}
  ]
}
7. **Competitive Benchmarking Report (R7)**
- Compare product ratings and key performance indicators.
Example :
{
  "report": "R7",
  "marketAvgRating": "4.0/5",
  "your Product": "4.2/5",
  "points": [
    "You are **above average** in product quality",
    "Below competitors in **customer service response time**"
  ]
}
8. **Response Strategy Development (R8)**
- Provide strategies for different types of reviews.
Example :
{
  "report": "R8",
  "Recommended Actions": {
    "negativeReviews": "Apologize, offer compensation, and improve issue resolution speed.",
    "positiveReviews": "Encourage customer advocacy & referrals.",
    "neutralReviews": "Seek more feedback to understand concerns."
  }
}
9. **Customer Complaints List (R9)**
- Generate a list of customer complaints (maximum 5).  
- If no complaints exist, return an empty list. 
Example :   
{
  "customer_complaints": [
    "Complaint 1",
    "Complaint 2",
    "Complaint 3"
  ]
}
Note : If there are any personal or sensitive topics please avoid answering those questions.`


Step 1: Adjusted Pricing Calculation for 75% Profit Margin
We'll calculate the price based on a 75% profit margin, which means your pricing should be 175% of the actual cost (100% + 75% profit). The formula is:

Selling Price
=
Cost
×
(
1
+
0.75
)
Selling Price=Cost×(1+0.75)
Step 2: Recalculate Pricing for Each Plan
Free Plan (For reference)
We won't charge for this plan, as it serves as a basic introductory offering. So, no changes here.
Paid Plan (100,000 Tokens)
Cost for You:

Input: 100,000 tokens × $0.0000025 = $0.25
Output: 100,000 tokens × $0.00001 = $1.00
Total Cost: $0.25 (input) + $1.00 (output) = $1.25
Selling Price (for 75% profit):

$1.25 × 1.75 = $2.19
Paid Plan Price: $2.20 (rounded up)

Premium Plan (1,000,000 Tokens)
Cost for You:

Input: 1,000,000 tokens × $0.0000025 = $2.50
Output: 1,000,000 tokens × $0.00001 = $10.00
Total Cost: $2.50 (input) + $10.00 (output) = $12.50
Selling Price (for 75% profit):

$12.50 × 1.75 = $21.88
Premium Plan Price: $22.00 (rounded up)

Summary of Updated Pricing Plans (with 75% margin)
Plan	Included Tokens	Selling Price	Cost for You	Profit Margin
Free Plan	1,000 input + 1,000 output	$0 (free)	$0.0125	-
Paid Plan	100,000 input + 100,000 output	$2.20	$1.25	75%
Premium Plan	1,000,000 input + 1,000,000 output	$22.00	$12.50	75%
Explanation:
Free Plan: Remains the same, as it provides an introductory experience for users.
Paid Plan: Priced at $2.20 to provide a 75% profit margin based on the input/output costs.
Premium Plan: Priced at $22.00, again ensuring a 75% profit margin for higher usage customers.
Conclusion:
By adjusting the pricing for a 75% profit margin, you are ensuring that you are charging enough to cover marketing costs, operational expenses, and the cost of using the GPT-4o model while still making a significant profit.

The Paid Plan at $2.20 and the Premium Plan at $22.00 should give you ample flexibility for scaling while keeping your profit margin high. The 75% margin is quite aggressive but could work if you are positioning your service as a premium offering or if you have a solid customer base that values the quality and capabilities of the service.
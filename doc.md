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
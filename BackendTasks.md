# Task

## Note
 - Need to add langchain to build feedwise 
## 1. Add the extra reports which are not dependent on the external data
- For this I need to make seperate 4 prompt in the each batch then retrivew them and process
 
 Such as :
  ###  R10 Feature Request Analysis :
-  Identify features or improvements requested by customers.

 ```json
   {
   "report": "R10",
   "featureRequests": [
     {"feature": "Larger package size", "percentage": "25%"},
     {"feature": "More flavor options", "percentage": "18%"}
   ]
   }
 ```
 ### R12: Emotional Tone Analysis
 Analyze the emotional tone of the feedback (e.g., happy, frustrated, disappointed).
 
 ```json
 {
   "report": "R12",
   "emotionalTone": [
     {"tone": "Happy", "percentage": "65%"},
     {"tone": "Frustrated", "percentage": "20%"},
     {"tone": "Disappointed", "percentage": "15%"}
   ]
 }
 ```
 
 ### Customer Loyalty Insights
 Identify feedback that indicates customer loyalty or repeat purchases.
 
 ```json 
 {
   "report": "R14",
   "loyaltyInsights": [
     {"insight": "Repeat customers", "percentage": "45%"},
     {"insight": "Customers willing to recommend", "percentage": "70%"}
   ]
 }
 ```
 
 ### R15: Feedback Length Analysis
 Analyze the length of feedback to identify detailed vs. brief reviews.
 
 ```json
 {
   "report": "R15",
   "feedbackLength": [
     {"length": "Detailed (100+ words)", "percentage": "30%"},
     {"length": "Brief (less than 50 words)", "percentage": "70%"}
   ]
 }
 ```

##  2. If length of the feedback/reviews is greater than x then summarise the feedback and then process
##  3. Generate report in the batch of 3 to get consistent data results
   - reports in the each batch 
   - save each reports in the db and then move for further processing ( Create a schema to save the report details mapping with the userId)
   - Get the all data a send it in the response
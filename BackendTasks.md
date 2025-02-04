# Task

## Note
 - Need to add langchain to build feedwise 
## 1. Add the extra reports which are not dependent on the external data //Done......

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


 ## Batch 1 Output
  ```json
  {
  "reportStatus": "success",
  "reportMessage": "Analysis completed successfully",
  "reports": [
    {
      "report": "R1",
      "positive": "80%",
      "neutral": "10%",
      "negative": "10%"
    },
    {
      "report": "R2",
      "mostMentionedTopics": [
        {"topic":"Product quality", "percentage":"35%"},
        {"topic":"Effectiveness", "percentage":"30%"},
        {"topic":"Price", "percentage":"20%"},
        {"topic":"Packaging",   "percentage":"15%"}
      ]
    },
    {
        "report":"R3",
        "suggestions":["Improve the packaging quality","Ensure product effectiveness","Reevaluate product pricing"]
     }
   ]
}
```


  ## Batch 3 output 

   ```json
   Response :  {"reportStatus": "success", "reportMessage": "Operational insights generated", "reports": [{"report": "R7", "customerComplaints": ["Overpriced when compared to others.", "PLease improve the packaging quality", "product is not that good and uneffective as i felt"]}, {"report": "R8", "featureRequests": [{"feature": "Better packaging quality", "percentage": "10%"}, {"feature": "Lower price", "percentage": "10%"}, {"feature": "Improved product effectiveness", "percentage": "10%"}]}, {"report": "R9",  "emotionalTone": [{"tone": "Joy",  "percentage":"55%" }, {"tone" :"Trust","percentage":"20%" },{"tone" :"Fear","percentage":"0%"}, {"tone" :"Surprise","percentage":"5%" },{"tone" :"Sadness","percentage":"5%" },{"tone" :"Disgust","percentage":"0%" },{"tone" :"Anticipation","percentage":"15%"}]}]}
   ```
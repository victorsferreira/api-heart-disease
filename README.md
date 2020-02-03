### AWS

EC2 Security Group must have an Inbound Rule to allow traffic on port <PORT> and source the same as the Subnet IP Address. Must also allow all traffic as an Outbound Rule

I.E.: 
Custom TCP Rule TCP     5000    <sg-ID>
All traffic     All     All     0.0.0.0/0

Create a second Security Group for Lambda. It doesn't need to have any Inbound Rule. Outbound is default as follows:
All traffic     All     All     0.0.0.0/0

Lambda Role Policies must contain
- CloudWatchLogsFullAccess
- AWSLambdaVPCAccessExecutionRole

In the Lambda Panel

For the Virtual Private Cloud (VPC) option select the VPC that contains both the Lambda's and EC2's Security Groups.

In the Subnets options, select the EC2 Subnet ID.

For Security Groups, select the Lambda's Security Group recently created.

### Attributes

age: age in years

sex: sex 
(1 = male; 0 = female)

cp: chest pain type
        -- Value 1: typical angina
        -- Value 2: atypical angina
        -- Value 3: non-anginal pain
        -- Value 4: asymptomatic

trestbps: resting blood pressure 
(in mm Hg on admission to the hospital)

chol: serum cholestoral in mg/dl

fbs: high fasting blood sugar 
(> 120 mg/dl  (1 = true; 0 = false)

restecg: resting electrocardiographic results
        -- Value 0: normal
        -- Value 1: having ST-T wave abnormality (T wave inversions and/or ST 
                    elevation or depression of > 0.05 mV)
        -- Value 2: showing probable or definite left ventricular hypertrophy
                    by Estes' criteria

thalach: maximum heart rate achieved

exang: exercise induced angina 
(1 = yes; 0 = no)

oldpeak = ST depression induced by exercise relative to rest

slope: the slope of the peak exercise ST segment
        -- Value 1: upsloping
        -- Value 2: flat
        -- Value 3: downsloping

ca: number of major vessels colored by flourosopy
(0-3)

thal: 3 = normal; 6 = fixed defect; 7 = reversable defect

### Request example
POST /predict
Headers:
Content-Type: application/json

Body:
{
        age: "",
        sex: "",
        cp: "",
        trestbps: "",
        chol: "",
        fbs: "",
        restecg: "",
        thalach: "",
        exang: "",
        oldpeak: "",
        slope: "",
        ca: "",
        thal: ""
}

### Response example
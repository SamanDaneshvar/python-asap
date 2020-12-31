---
layout: page
title: Certificates
subTitle: Saman Daneshvar's Coding Academy
---
## Verify a certificate

- Search by name and date of birth: John • Smith • 1985-01-08
- Search by certificate code: 2012-0486

<!--
| Legal Name | Certificate Code |
| :- | :- |
| John Smith | 2012-0486 |
| Jane Black | 2012-7362 |

&nbsp; | &nbsp;
:- | :-
**Participant's Legal Name** | John Smith
**Certificate Number** | 2012-0486
**Date Issued** | December 5, 2020
**Status** | Valid
**Course Name** | Zero to Intermediate Python Programming
**Course Length** | 18 hours
**Curriculum** | [Z2I Python]()
**Grade** | [Certificate of Participation]()
**Achievability** | 12/12


## Did not find the certificate you were trying to verify?
[Request an official confirmation]() or [report a false claim]().

## Did not find your own certificate?
[Report an issue with the database]() (e.g., false or missing information).

Rest assured that at Saman Daneshvar's Coding Academy records don't go missing! If you have successfully completed a course, you are entitled to a certificate.
-->






<!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->

<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
<script defer src="https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js"></script>
<!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
<script defer src="https://www.gstatic.com/firebasejs/8.1.2/firebase-analytics.js"></script>
<!-- Add any other Firebase products that you want to use -->
<script defer src="https://www.gstatic.com/firebasejs/8.1.2/firebase-auth.js"></script>
<script defer src="https://www.gstatic.com/firebasejs/8.1.2/firebase-firestore.js"></script>


<!-- Previously loaded Firebase SDKs -->
<script defer src="{{ site.url }}/assets/js/init-firebase.js"></script>




<h3> Search by certificate number:</h3>
<input id="query_certificate" type="textfield" />
<button id="get_button">Get</button>
<script defer src="{{ site.url }}/assets/js/test_app.js"></script>

&nbsp; | &nbsp;
:- | :-
**Participant's Legal Name** | <div id="first_name"></div> <div id="last_name"></div>

---

**Participant's Legal Name**: <div id="first_name">A</div> <div id="last_name">B</div>
**Certificate Number**: <div id="certificate_number" />
**Date Issued**: <div id="date_of_issue" />
**Status**: <div id="status" />
**Course Name**: <div id="course_name" />
**Course Length**: <div id="course_length" />
**Curriculum**: [<div id="course_curriculum" />]()
**Grade**: [<div id="certification_grade" />]()
**Achievability**: <div id="achievability" />

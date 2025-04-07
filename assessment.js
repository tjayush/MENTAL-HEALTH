document.addEventListener('DOMContentLoaded', () => {
        const questionContainer = document.getElementById('question-container');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        const resultContainer = document.getElementById('result-container');
        const resultMessage = document.querySelector('.assessment-completed');
        const resultDetails = document.getElementById('result-details');
        const restartBtn = document.getElementById('restart-btn');
        const progressContainer = document.getElementById('progress-container');
        const progressBar = document.getElementById('progress-bar');
        const graphContainer = document.getElementById('comparative-data');
        const demographicInfoDiv = document.getElementById('demographic-info');
        const phq9ResultsDiv = document.getElementById('phq9-results');
        const gad7ResultsDiv = document.getElementById('gad7-results');
        const showUsernameCheckbox = document.getElementById('show-username');
        const userNamePlaceholder = document.getElementById('user-name-placeholder');
    
        const questions = [
            // Demographic Questions
            {
                questionText: "What is your age category?",
                type: "radio",
                options: [
                    { text: "16-18 years", value: "16-18" },
                    { text: "19-22 years", value: "19-22" },
                    { text: "23-25 years", value: "23-25" },
                    { text: "26+ years", value: "26+" }
                ],
                section: "demographic"
            },
            {
                questionText: "On average, how many hours do you study per week?",
                type: "number",
                min: 0,
                max: 100,
                unit: " hours",
                section: "demographic"
            },
            {
                questionText: "What is your gender?",
                type: "radio",
                options: [
                    { text: "Male", value: "male" },
                    { text: "Female", value: "female" },
                    { text: "Non-binary", value: "non-binary" },
                    { text: "Prefer not to say", value: "prefer-not-to-say" }
                ],
                section: "demographic"
            },
            {
                questionText: "Are you currently enrolled as a student?",
                type: "radio",
                options: [
                    { text: "Yes", value: "yes" },
                    { text: "No", value: "no" }
                ],
                section: "demographic"
            },
            // Video Response Questions
            {
                questionText: "Watch this comedy video and tell us how it made you feel.",
                type: "video-response",
                videoUrl: "comedy .mp4", // Replace with the actual path
                options: [
                    { text: "Happy", value: "happy" },
                    { text: "Amused", value: "amused" },
                    { text: "Neutral", value: "neutral" },
                    { text: "Slightly Down", value: "slightly-down" },
                    { text: "Sad", value: "sad" }
                ],
                scoreMapping: {
                    "happy": { phq9: -1, gad7: -1 },
                    "amused": { phq9: -0.5, gad7: -0.5 },
                    "neutral": { phq9: 0, gad7: 0 },
                    "slightly-down": { phq9: 0.5, gad7: 0.5 },
                    "sad": { phq9: 1, gad7: 1 }
                }
            },
            {
                questionText: "Watch this thriller video and tell us how it made you feel.",
                type: "video-response",
                videoUrl: "ghost .mp4", // Replace with the actual path
                options: [
                    { text: "Excited", value: "excited" },
                    { text: "Nervous", value: "nervous" },
                    { text: "Neutral", value: "neutral" },
                    { text: "Calm", value: "calm" },
                    { text: "Anxious", value: "anxious" }
                ],
                scoreMapping: {
                    "excited": { phq9: 0, gad7: 0.5 },
                    "nervous": { phq9: 0.5, gad7: 1 },
                    "neutral": { phq9: 0, gad7: 0 },
                    "calm": { phq9: -0.5, gad7: -0.5 },
                    "anxious": { phq9: 0.5, gad7: 1.5 }
                }
            },
            {
                questionText: "Watch this sad video and tell us how it made you feel.",
                type: "video-response",
                videoUrl: "emo.mp4", // Replace with the actual path
                options: [
                    { text: "Sad", value: "sad" },
                    { text: "Emotional", value: "Emotional" },
                    { text: "Neutral", value: "neutral" },
                    { text: "Slightly Happy", value: "slightly-happy" },
                    { text: "Happy", value: "happy" }
                ],
                scoreMapping: {
                    "sad": { phq9: 1.5, gad7: 0.5 },
                    "Emotional": { phq9: 1, gad7: 0.3 },
                    "neutral": { phq9: 0, gad7: 0 },
                    "slightly-happy": { phq9: -0.3, gad7: -0.3 },
                    "happy": { phq9: -0.5, gad7: -0.5 }
                }
            },
            // PHQ-9 Questions (Feeling over the last 2 weeks)
            {
                questionText: "Little interest or pleasure in doing things?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "phq9",
                section: "phq9"
            },
            {
                questionText: "Feeling down, depressed, or hopeless?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "phq9",
                section: "phq9"
            },
            {
                questionText: "Trouble falling or staying asleep, or sleeping too much?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "phq9",
                section: "phq9"
            },
            {
                questionText: "Feeling tired or having little energy?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "phq9",
                section: "phq9"
            },
            {
                questionText: "Poor appetite or overeating?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "phq9",
                section: "phq9"
            },
            {
                questionText: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "phq9",
                section: "phq9"
            },
            {
                questionText: "Trouble concentrating on things, such as reading the newspaper or watching television?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "phq9",
                section: "phq9"
            },
            {
                questionText: "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "phq9",
                section: "phq9"
            },
            {
                questionText: "Thoughts that you would be better off dead, or of hurting yourself in some way?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "phq9",
                section: "phq9"
            },
    
            // GAD-7 Questions (Feeling over the last 2 weeks)
            {
                questionText: "Feeling nervous, anxious, or on edge?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "gad7",
                section: "gad7"
            },
            {
                questionText: "Not being able to stop or control worrying?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "gad7",
                section: "gad7"
            },
            {
                questionText: "Worrying too much about different things?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "gad7",
                section: "gad7"
            },
            {
                questionText: "Trouble relaxing?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "gad7",
                section: "gad7"
            },
            {
                questionText: "Being so restless that it's hard to sit still?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "gad7",
                section: "gad7"
            },
            {
                questionText: "Becoming easily annoyed or irritable?",
                type: "radio",
                options: [
                    { text: "Not at all", value: 0 },
                    { text: "Several days", value: 1 },
                    { text: "More than half the days", value: 2 },
                    { text: "Nearly every day", value: 3 }
                ],
                scoreKey: "gad7",
                section: "gad7"
            }
        ];
    
        let currentQuestionIndex = 0;
        const userAnswers = {};
    
        function displayQuestion() {
            questionContainer.innerHTML = '';
            const currentQuestion = questions[currentQuestionIndex];
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            if (currentQuestion.type === "video-response") {
                questionDiv.classList.add('video-response-question'); // Add this class
            }
            questionDiv.innerHTML = `<h3>${currentQuestion.questionText}</h3>`;
    
            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');
    
            if (currentQuestion.type === "radio") {
                currentQuestion.options.forEach((option, index) => {
                    const optionDiv = document.createElement('div');
                    optionDiv.classList.add('option');
                    const input = document.createElement('input');
                    input.type = "radio";
                    input.name = `question-${currentQuestionIndex}`;
                    input.value = option.value;
                    input.id = `option-${currentQuestionIndex}-${index}`;
                    if (userAnswers[`question-${currentQuestionIndex}`] === option.value.toString()) {
                        input.checked = true;
                        optionDiv.classList.add('selected'); // Add 'selected' class
                    }
                    const label = document.createElement('label');
                    label.textContent = option.text;
                    label.setAttribute('for', `option-${currentQuestionIndex}-${index}`);
    
                    optionDiv.appendChild(input);
                    optionDiv.appendChild(label);
                    optionsDiv.appendChild(optionDiv);
    
                    input.addEventListener('change', () => handleOptionSelect(`question-${currentQuestionIndex}`, option.value));
                });
            } else if (currentQuestion.type === "number") {
                const input = document.createElement('input');
                input.type = "number";
                input.min = currentQuestion.min;
                input.max = currentQuestion.max;
                input.value = userAnswers[`question-${currentQuestionIndex}`] || "";
                input.addEventListener('change', (event) => handleOptionSelect(`question-${currentQuestionIndex}`, parseInt(event.target.value)));
                optionsDiv.appendChild(input);
                if (currentQuestion.unit) {
                    const unitSpan = document.createElement('span');
                    unitSpan.textContent = currentQuestion.unit;
                    optionsDiv.appendChild(unitSpan);
                }
            } else if (currentQuestion.type === "video-response") {
                const video = document.createElement('video');
                video.src = currentQuestion.videoUrl; // This should now be the path to your MP4 file
                video.width = "560"; // Adjust as needed
                video.height = "315"; // Adjust as needed
                video.controls = true; // Add controls like play, pause, etc.
    
                questionDiv.appendChild(video); // Append video to the question div
    
                currentQuestion.options.forEach((option, index) => {
                    const optionDiv = document.createElement('div');
                    optionDiv.classList.add('option');
                    const input = document.createElement('input');
                    input.type = "radio";
                    input.name = `question-${currentQuestionIndex}`;
                    input.value = option.value;
                    input.id = `option-${currentQuestionIndex}-${index}`;
                    if (userAnswers[`question-${currentQuestionIndex}`] === option.value) {
                        input.checked = true;
                        optionDiv.classList.add('selected'); // Add 'selected' class
                    }
                    const label = document.createElement('label');
                    label.textContent = option.text;
                    label.setAttribute('for', `option-${currentQuestionIndex}-${index}`);
    
                    optionDiv.appendChild(input);
                    optionDiv.appendChild(label);
                    optionsDiv.appendChild(optionDiv);
    
                    // Add the event listener here for video response options
                    input.addEventListener('change', () => handleOptionSelect(`question-${currentQuestionIndex}`, option.value));
                });
                questionDiv.appendChild(optionsDiv); // Append options div after the video
            }
    
            questionDiv.appendChild(optionsDiv);
            questionContainer.appendChild(questionDiv);
            updateNavigationButtons();
            updateProgressBar();
        }
    
        function handleOptionSelect(questionId, value) {
            userAnswers[questionId] = value;
            // Remove 'selected' class from all options in the current question
            const options = document.querySelectorAll(`.question:nth-child(${currentQuestionIndex + 1}) .options .option`);
            options.forEach(option => option.classList.remove('selected'));
    
            // Add 'selected' class to the newly selected option
            const selectedOption = document.querySelector(`.question:nth-child(${currentQuestionIndex + 1}) .options .option input[value="${value}"]`).parentNode;
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
            updateNavigationButtons();
        }
    
        function nextQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            const questionId = `question-${currentQuestionIndex}`;
            if (currentQuestion.type === "radio" && userAnswers[questionId] === undefined) {
                alert("Please select an option.");
                return;
            } else if (currentQuestion.type === "number" && (userAnswers[questionId] === undefined || isNaN(userAnswers[questionId]))) {
                alert("Please enter a valid number.");
                return;
            } else if (currentQuestion.type === "video-response" && userAnswers[questionId] === undefined) {
                alert("Please select how the video made you feel.");
                return;
            }
    
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
            }
        }
    
        function prevQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                displayQuestion();
            }
        }
    
        function updateNavigationButtons() {
            prevBtn.disabled = currentQuestionIndex === 0;
            nextBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
            submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
        }
    
        function updateProgressBar() {
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    
        function calculateResults() {
            console.log("Calculating results...");
            let phq9Score = 0;
            let gad7Score = 0;
            const demographicInfo = {};
            console.log("User Answers inside calculateResults:", userAnswers);
    
            for (const questionId in userAnswers) {
                const index = parseInt(questionId.split('-')[1]);
                const question = questions[index];
                console.log("Processing question:", question, "with answer:", userAnswers[questionId]);
                if (question.scoreKey === "phq9") {
                    phq9Score += parseInt(userAnswers[questionId]);
                } else if (question.scoreKey === "gad7") {
                    gad7Score += parseInt(userAnswers[questionId]);
                } else if (question.section === "demographic") {
                    const questionText = questions[index].questionText;
                    demographicInfo[questionText] = userAnswers[questionId];
                } else if (question.type === "video-response") {
                    const selectedFeeling = userAnswers[questionId];
                    if (question.scoreMapping && question.scoreMapping[selectedFeeling]) {
                        phq9Score += question.scoreMapping[selectedFeeling].phq9 || 0;
                        gad7Score += question.scoreMapping[selectedFeeling].gad7 || 0;
                    }
                }
            }
    
            console.log("Calculated PHQ9 Score:", phq9Score);
            console.log("Calculated GAD7 Score:", gad7Score);
            console.log("Demographic Info:", demographicInfo);
            return { phq9Score, gad7Score, demographicInfo };
        }
    
        function displayResults(results) {
            console.log("Displaying results...", results);
            const { phq9Score, gad7Score, demographicInfo } = results;
            console.log("PHQ9 Score in displayResults:", phq9Score);
            console.log("GAD7 Score in displayResults:", gad7Score);
            console.log("Demographic Info in displayResults:", demographicInfo);
    
            let depressionSeverity = getSeverityLevel(phq9Score, 'phq9');
            let anxietySeverity = getSeverityLevel(gad7Score, 'gad7');
    
            let demographicHTML = "<h4>Demographic Information:</h4><ul>";
            for (const key in demographicInfo) {
                demographicHTML += `<li><strong>${key}:</strong> ${demographicInfo[key]}</li>`;
            }
            demographicHTML += "</ul>";
            demographicInfoDiv.innerHTML = demographicHTML;
    
            let phq9HTML = "<h4>PHQ-9 Depression Assessment:</h4>";
            phq9HTML += `<p>Your score: <strong>${phq9Score}</strong></p>`;
            phq9HTML += `<p>Potential Depression Severity: <strong>${depressionSeverity}</strong></p>`;
            phq9HTML += "<p>PHQ-9 Interpretation Guide:</p><ul>";
            phq9HTML += "<li>0-4: Minimal depression</li>";
            phq9HTML += "<li>5-9: Mild depression</li>";
            phq9HTML += "<li>10-14: Moderate depression</li>";
            phq9HTML += "<li>15-19: Moderately severe depression</li>";
            phq9HTML += "<li>20-27: Severe depression</li>";
            phq9HTML += "</ul>";
            phq9ResultsDiv.innerHTML = phq9HTML;
    
            let gad7HTML = "<h4>GAD-7 Anxiety Assessment:</h4>";
            gad7HTML += `<p>Your score: <strong>${gad7Score}</strong></p>`;
            gad7HTML += `<p>Potential Anxiety Severity: <strong>${anxietySeverity}</strong></p>`;
            gad7HTML += "<p>GAD-7 Interpretation Guide:</p><ul>";
            gad7HTML += "<li>0-4: Minimal anxiety</li>";
            gad7HTML += "<li>5-9: Mild anxiety</li>";
            gad7HTML += "<li>10-14: Moderate anxiety</li>";
            gad7HTML += "<li>15-21: Severe anxiety</li>";
            gad7HTML += "</ul>";
            gad7ResultsDiv.innerHTML = gad7HTML;
    
            resultMessage.textContent = "Assessment Completed!";
            document.querySelector('.assessment-container').style.display = 'none';
            questionContainer.style.display = 'none';
            document.querySelector('.assessment-nav').style.display = 'none';
            progressContainer.style.display = 'none';
            resultContainer.style.display = 'block';
            console.log("Result Container Display Style:", resultContainer.style.display);
    
            displayComparativeGraphs({ phq9Score, gad7Score, demographicInfo });
        }
    
        function displayComparativeGraphs(results) {
            const graphContainer = document.getElementById('comparative-data');
            if (!graphContainer) return;
            graphContainer.innerHTML = '<h3>Comparative Mental Health Data</h3><p>This section shows how your results compare to general student mental health data.</p><div id="depression-comparison"><canvas id="depressionChart"></canvas></div><div id="anxiety-comparison"><canvas id="anxietyChart"></canvas></div>';
    
            const depressionCanvas = document.getElementById('depressionChart');
            const anxietyCanvas = document.getElementById('anxietyChart');
    
            if (depressionCanvas && anxietyCanvas) {
                const depressionCtx = depressionCanvas.getContext('2d');
                const anxietyCtx = anxietyCanvas.getContext('2d');
    
                // --- More Realistic Placeholder Data for Comparison (General Student Population) ---
                const averageStudentDepression = 6; // Example average PHQ-9 score for students
                const averageStudentAnxiety = 5;     // Example average GAD-7 score for students
    
                const userDepressionScore = results.phq9Score;
                const userAnxietyScore = results.gad7Score;
    
                new Chart(depressionCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Your Score', 'Average Student'],
                        datasets: [{
                            label: 'Depression Level (PHQ-9)',
                            data: [userDepressionScore, averageStudentDepression],
                            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 27, // Max PHQ-9 score
                                title: {
                                    display: true,
                                    text: 'Score'
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Depression Score Comparison'
                            }
                        }
                    }
                });
    
                new Chart(anxietyCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Your Score', 'Average Student'],
                        datasets: [{
                            label: 'Anxiety Level (GAD-7)',
                            data: [userAnxietyScore, averageStudentAnxiety],
                            backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                            borderColor: ['rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 21, // Max GAD-7 score
                                title: {
                                    display: true,
                                    text: 'Score'
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Anxiety Score Comparison'
                            }
                        }
                    }
                });
            } else {
                graphContainer.innerHTML += '<p>Error: Could not find canvas elements for charts.</p>';
            }
        }
    
        function getSeverityLevel(score, type) {
            if (type === 'phq9') {
                if (score >= 0 && score <= 4) return "Minimal";
                if (score >= 5 && score <= 9) return "Mild";
                if (score >= 10 && score <= 14) return "Moderate";
                if (score >= 15 && score <= 19) return "Moderately Severe";
                if (score >= 20 && score <= 27) return "Severe";
            } else if (type === 'gad7') {
                if (score >= 0 && score <= 4) return "Minimal";
                if (score >= 5 && score <= 9) return "Mild";
                if (score >= 10 && score <= 14) return "Moderate";
                if (score >= 15 && score <= 21) return "Severe";
            }
            return "Unknown";
        }
    
        function submitAssessment() {
            console.log("Submit button clicked!");
            const answeredCount = Object.keys(userAnswers).length;
            if (answeredCount < questions.length) {
                alert("Please answer all the questions before submitting.");
                return;
            }
    
            const results = calculateResults();
            console.log("Calculated Results:", results); // Added console log
            displayResults(results);
        }
    
        function restartAssessment() {
            currentQuestionIndex = 0;
            userAnswers = {};
            questionContainer.style.display = 'block';
            document.querySelector('.assessment-nav').style.display = 'flex';
            progressContainer.style.display = 'block';
            resultContainer.style.display = 'none';
            if (graphContainer) graphContainer.innerHTML = ''; // Clear previous graphs
            displayQuestion();
        }
    
        nextBtn.addEventListener('click', nextQuestion);
        prevBtn.addEventListener('click', prevQuestion);
        submitBtn.addEventListener('click', submitAssessment);
        restartBtn.addEventListener('click', restartAssessment);
    
        showUsernameCheckbox.addEventListener('change', function() {
            if (this.checked) {
                const userName = prompt("Please enter your name:");
                if (userName) {
                    userNamePlaceholder.textContent = userName;
                    userNamePlaceholder.style.display = 'inline';
                } else {
                    this.checked = false; // Uncheck if no name is entered
                    userNamePlaceholder.style.display = 'none';
                }
            } else {
                userNamePlaceholder.style.display = 'none';
            }
        });
    
        displayQuestion(); // Initial display of the first question
    });
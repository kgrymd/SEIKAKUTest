$(document).ready(function () {
    const questions = [
        { question: "あなたは過去に戻って、歴史の中の悲劇を防ぐことができます。しかし、防げる悲劇は次の2つのうち1つだけです。どちらを選びますか？", choices: "A) タイタニック号の沈没 B) チェルノブイリ原子力発電所事故", answers: ["A", "B"], },
        { question: "あなたは次のうちどちらか一つだけの能力を手に入れることができます。どちらを選びますか？", choices: "A) 他人の心を読むことができる B) 自分の未来を予知することができる", answers: ["A", "B"], },
        { question: "人類全体に影響を与える重要な発見ができますが、次のうちどちらか一つだけです。どちらを選びますか？", choices: "A) 無限のエネルギー源 B) すべての病気を治す薬", answers: ["A", "B"], },
        { question: "あなたは次のうちどちらか一つだけの才能を持つことができます。どちらを選びますか？", choices: "A) 世界中の言語を話すことができる B) どんな楽器でも演奏することができる", answers: ["A", "B"], },
        {
            question: "あなたは次のうちどちらか一つだけの場所に住むことができます。どちらを選びますか？", choices: "A) 常に静かで美しい山の中の小屋 B) 活気に満ちた大都市の中心地", answers: ["A", "B"],
        },
        { question: "あなたはどちらか一つだけの動物と心を通わせることができます。どちらを選びますか？", choices: "A) 犬 B) 猫", answers: ["A", "B"], },
        { question: "あなたは次のうちどちらか一つだけの特別な冒険に出ることができます。どちらを選びますか？", choices: "A) 宇宙旅行 B) 深海探検", answers: ["A", "B"], },
        {
            question: "あなたは次のうちどちらか一つだけのスポーツでプロになることができます。どちらを選びますか？", choices: "A) サッカー B) バスケットボール", answers: ["A", "B"],
        },
        { question: "あなたは次のうちどちらか一つだけの歴史上の人物と会うことができます。どちらを選びますか？", choices: "A) アインシュタイン B) クレオパトラ", answers: ["A", "B"], },
        { question: "あなたは次のうちどちらか一つだけの映画の世界に入ることができます。どちらを選びますか？", choices: "A) ハリー・ポッターの世界 B) アバターのパンドラの惑星", answers: ["A", "B"], },
    ];

    let currentQuestionIndex = 0;
    let touchPoints = [];
    let timer = null;

    function displayQuestion() {
        $("#nOfQuestions").text(`第${currentQuestionIndex + 1}問`);
        const question = questions[currentQuestionIndex];
        $("#question").text(question.question);
        $("#choices").text(question.choices);
        $("#button1").text(question.answers[0]);
        $("#button2").text(question.answers[1]);
        startTimer();
    }

    function updateTimerDisplay() {
        $("#timer").text(timeLeft);
    }

    function startTimer() {
        timeLeft = 10;
        updateTimerDisplay();
        timer = setInterval(function () {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                proceedToNextQuestion();
            }
        }, 1000);
    }


    function proceedToNextQuestion() {
        if (timer !== null) {
            clearInterval(timer);
        }
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            $("#timer-container").hide(); // カウントダウン表示を消す
            $("#result").text("結果はこちら↓");
            const accuracy = calculateAccuracy(touchPoints);
            $(".answer-button").off("click");
            $("#result-button").show();
        }
    }


    function calculateAccuracy(points) {
        const totalDistance = points.reduce((total, point) => {
            return total + Math.sqrt(point.x * point.x + point.y * point.y);
        }, 0);
        return (totalDistance / points.length).toFixed(2);
    }

    $(".answer-button").on("click", function (event) {
        const clickedButton = $(this);

        const offsetX = event.offsetX - clickedButton.width() / 2;
        const offsetY = event.offsetY - clickedButton.height() / 2;
        touchPoints.push({ x: offsetX, y: offsetY });

        proceedToNextQuestion();
    });

    $("#result-button").on("click", function () {
        const accuracy = calculateAccuracy(touchPoints);
        if (accuracy < 15) {
            window.location.href = `result4.html`;
        } else if (accuracy < 21) {
            window.location.href = `result1.html`;
        } else if (accuracy > 35) {
            window.location.href = `result2.html`;
        } else {
            window.location.href = `result3.html`;
        }
    });

    displayQuestion();
});

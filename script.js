document.addEventListener("DOMContentLoaded", () => {
    // Fast dismissal of loading screen
    setTimeout(() => {
        const loader = document.getElementById("loading-screen");
        if (loader) {
            loader.classList.add("fade-out");
            setTimeout(() => loader.remove(), 400);
        }
    }, 300);

    // Live Clock
    setInterval(() => {
        const clock = document.getElementById("live-clock");
        if (clock) {
            clock.textContent = new Date().toLocaleTimeString();
        }
    }, 1000);

    // Tab Navigation
    const navBtns = document.querySelectorAll(".nav-btn");
    navBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            navBtns.forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
            
            btn.classList.add("active");
            const target = document.getElementById(`tab-${btn.dataset.tab}`);
            if (target) target.classList.add("active");
        });
    });

    // Secure Deposit Logic (Exploit Patched)
    const depositBtn = document.getElementById("submit-deposit-btn");
    if (depositBtn) {
        depositBtn.addEventListener("click", () => {
            const cardInput = document.getElementById("deposit-card-input").value.trim();
            const amountInput = parseFloat(document.getElementById("deposit-amount-input").value);

            if (!cardInput || cardInput.length < 4) {
                alert("Security Error: Invalid or missing card reference. Cannot deposit without card verification.");
                return;
            }

            if (isNaN(amountInput) || amountInput <= 0) {
                alert("Please enter a valid deposit amount.");
                return;
            }

            // Successfully validated secure deposit
            let currentBal = parseFloat(localStorage.getItem("spikey_balance") || "0");
            currentBal += amountInput;
            localStorage.setItem("spikey_balance", currentBal.toFixed(2));

            const balanceEl = document.getElementById("user-balance");
            if (balanceEl) balanceEl.textContent = `$${currentBal.toFixed(2)}`;

            alert(`Successfully deposited $${amountInput.toFixed(2)} securely.`);
            document.getElementById("deposit-amount-input").value = "";
            document.getElementById("deposit-card-input").value = "";
        });
    }

    // Initialize initial state
    const savedBal = localStorage.getItem("spikey_balance") || "0.00";
    const balanceEl = document.getElementById("user-balance");
    if (balanceEl) balanceEl.textContent = `$${parseFloat(savedBal).toFixed(2)}`;
});

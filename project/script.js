const state = {
    commute: 25,
    energy: 8,
    diet: 10,
    questReduction: 0,
    marketOffset: 0,
    activeScore: 0,
    activeTrees: 0,
    auditTrailRaw: [], // Master internal log repository tracking client interactions
    mockGlobalPeers: [
        { name: "Alpha_Node_01", score: 2.9, status: "Optimized" },
        { name: "Beta_Node_99", score: 3.6, status: "Optimized" },
        { name: "You (Google Guest)", score: 4.2, status: "Evaluating", isUser: true },
        { name: "Delta_Node_22", score: 6.4, status: "Unoptimized" },
        { name: "Sigma_Cluster", score: 8.1, status: "Unoptimized" }
    ]
};

const TARGET_GOAL = 4.5;
let projectionChart = null;
let interpolateLoop = null;

const elements = {
    commuteSlider: document.getElementById('commute'),
    energySlider: document.getElementById('energy'),
    dietSlider: document.getElementById('diet'),
    commuteVal: document.getElementById('commute-val'),
    energyVal: document.getElementById('energy-val'),
    dietVal: document.getElementById('diet-val'),
    scoreDisplay: document.getElementById('score-display'),
    treesDisplay: document.getElementById('trees-display'),
    progressCircle: document.getElementById('progress-circle'),
    statusBadge: document.getElementById('status-badge'),
    userRank: document.getElementById('user-rank'),
    insightBox: document.getElementById('insight-box'),
    themeToggle: document.getElementById('theme-toggle'),
    toastDeck: document.getElementById('toast-deck'),
    ledgerBody: document.getElementById('ledger-body'),
    marketLiability: document.getElementById('market-liability'),
    marketCost: document.getElementById('market-cost'),
    badgeEfficiency: document.getElementById('badge-efficiency'),
    badgeMobility: document.getElementById('badge-mobility'),
    badgeGuardian: document.getElementById('badge-guardian'),
    geoInfo: document.getElementById('geo-info'),
    leaderboardBody: document.getElementById('leaderboard-body'),
    exportBtn: document.getElementById('export-ledger-btn'),
    navItems: document.querySelectorAll('.nav-item'),
    tabContents: document.querySelectorAll('.tab-content'),
    questCheckboxes: document.querySelectorAll('.quest-checkbox')
};

function dispatchToast(msg, type = "info") {
    const toast = document.createElement('div');
    toast.className = 'toast-node';
    toast.style.borderLeftColor = type === "success" ? "var(--google-green)" : "var(--google-blue)";
    toast.innerHTML = `<span>⚙️</span> <p>${msg}</p>`;
    elements.toastDeck.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-12px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// REAL-TIME AUDITED TRANSACTION TRAIL LEDGER LOG WITH INTERNAL MEMORY WRITE
function appendLedgerEntry(eventAction, delta) {
    const timestamp = new Date().toLocaleTimeString();
    
    // Write entry to memory array block for download compile calls
    state.auditTrailRaw.push({ time: timestamp, action: eventAction, change: delta });

    const ledgerRow = document.createElement('div');
    ledgerRow.className = 'ledger-row';
    ledgerRow.innerHTML = `
        <span style="color: var(--text-secondary);">${timestamp}</span>
        <span>${eventAction}</span>
        <span style="color: ${delta.startsWith('-') ? 'var(--google-green)' : 'var(--google-blue)'}">${delta}</span>
    `;
    elements.ledgerBody.insertBefore(ledgerRow, elements.ledgerBody.firstChild);
}

// ADVANCED CLIENT-SIDE VIRTUAL FILE COMPILE ENGINE 
function compileAndDownloadAuditLedger() {
    if (state.auditTrailRaw.length === 0) {
        dispatchToast("Data compilation failure: No environmental transaction records identified yet.", "error");
        return;
    }

    dispatchToast("Compiling security ledger vectors...", "info");

    let fileContent = `==================================================\n`;
    fileContent += `   ECOTRACK OS SYSTEM METRIC TRANSACTION REPORT   \n`;
    fileContent += `   GENERATED VIA CLIENT-SIDE NEXUS ARCHITECTURE   \n`;
    fileContent += `==================================================\n`;
    fileContent += `Timestamp        | Action Vector                  | Delta State\n`;
    fileContent += `--------------------------------------------------\n`;

    state.auditTrailRaw.forEach(entry => {
        const timePadding = entry.time.padEnd(16, ' ');
        const actionPadding = entry.action.padEnd(30, ' ');
        fileContent += `${timePadding} | ${actionPadding} | ${entry.change}\n`;
    });

    fileContent += `\n==================================================\n`;
    fileContent += `FINAL APPLICATION STATE PROFILE SUMMARIES:\n`;
    fileContent += `- Absolute Environmental Carbon Footprint Index: ${state.activeScore.toFixed(2)} Tons CO2e\n`;
    fileContent += `- Offset Forestry Nodes Required Balance: ${state.activeTrees} units\n`;
    fileContent += `==================================================\n`;

    // Localized zero-latency virtual blob injection logic
    const dynamicBlob = new Blob([fileContent], { type: 'text/plain' });
    const downloadLinkAnchor = document.createElement('a');
    
    downloadLinkAnchor.download = `EcoTrack_OS_Audit_Manifest_${Math.floor(Date.now() / 1000)}.txt`;
    downloadLinkAnchor.href = window.URL.createObjectURL(dynamicBlob);
    downloadLinkAnchor.style.display = 'none';
    
    document.body.appendChild(downloadLinkAnchor);
    downloadLinkAnchor.click();
    document.body.removeChild(downloadLinkAnchor);
    
    dispatchToast("System cryptographic audit data report downloaded!", "success");
}

function initGeoAffectorSimulation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude.toFixed(2);
            const lon = pos.coords.longitude.toFixed(2);
            elements.geoInfo.textContent = `Region Grid: Node [${lat}° N, ${lon}° E] | Solar Efficiency: Premium`;
            dispatchToast("Geo-Location telemetry engine synchronized successfully.");
        }, () => {
            elements.geoInfo.textContent = "Region Grid: Global Hub Core | Calibration Factor: 1.0x Baseline";
        });
    }
}

function processEnvironmentalMatrices() {
    const cImpact = state.commute * 0.07;
    const eImpact = state.energy * 0.14;
    const dImpact = state.diet * 0.11;
    
    let targetOutputScore = (cImpact + eImpact + dImpact) - state.questReduction - state.marketOffset;
    if (targetOutputScore < 0.2) targetOutputScore = 0.2;
    
    const targetOutputTrees = Math.round(targetOutputScore * 4.8);

    triggerInterpolationCounter(targetOutputScore, targetOutputTrees);
    updateHeuristicInsights(cImpact, eImpact, dImpact);
    evalAchievementMatrix(targetOutputScore);
    syncGlobalLeaderboardMatrix(targetOutputScore);
    updateMarketplaceMetrics(targetOutputScore);
}

function triggerInterpolationCounter(tScore, tTrees) {
    if (interpolateLoop) clearInterval(interpolateLoop);
    
    interpolateLoop = setInterval(() => {
        const scoreDiff = tScore - state.activeScore;
        const treesDiff = tTrees - state.activeTrees;
        
        if (Math.abs(scoreDiff) < 0.05 && Math.abs(treesDiff) === 0) {
            state.activeScore = tScore;
            state.activeTrees = tTrees;
            clearInterval(interpolateLoop);
        } else {
            state.activeScore += scoreDiff * 0.25;
            state.activeTrees += Math.sign(treesDiff);
        }
        
        renderFrameUI(state.activeScore, state.activeTrees);
    }, 16);
}

function renderFrameUI(score, trees) {
    elements.scoreDisplay.textContent = score.toFixed(1);
    elements.treesDisplay.textContent = Math.max(0, trees);

    const percentage = Math.min((score / 15) * 360, 360);
    if (score <= TARGET_GOAL) {
        elements.progressCircle.style.background = `conic-gradient(var(--google-green) ${percentage}deg, var(--border-color) 0deg)`;
        elements.statusBadge.textContent = "Optimized Parameter Run";
        elements.statusBadge.className = "live-badge badge-green";
        elements.userRank.textContent = "Carbon Guardian 🌲";
    } else {
        elements.progressCircle.style.background = `conic-gradient(var(--google-red) ${percentage}deg, var(--border-color) 0deg)`;
        elements.statusBadge.textContent = "Unoptimized Parameter Run";
        elements.statusBadge.className = "live-badge badge-red";
        elements.userRank.textContent = "Sprout Tier 🌱";
    }
    
    if (projectionChart) {
        projectionChart.data.datasets[0].data = [12, 10, 8, 6, 4];
        projectionChart.data.datasets[1].data = [score.toFixed(1), (score * 2).toFixed(1), (score * 3).toFixed(1), (score * 4).toFixed(1), (score * 5).toFixed(1)];
        projectionChart.data.datasets[2].data = [14, 18, 22, 26, 30];
        projectionChart.update('none');
    }
}

function updateHeuristicInsights(c, e, d) {
    if (c >= e && c >= d) {
        elements.insightBox.innerHTML = `<strong>Engine Diagnostic:</strong> Transportation loops dominate current profile. Transition system parameters to micro-mobility.`;
    } else if (e >= c && e >= d) {
        elements.insightBox.innerHTML = `<strong>Engine Diagnostic:</strong> High building energy load registered. Isolate phantom power nodes via Quests panel.`;
    } else {
        elements.insightBox.innerHTML = `<strong>Engine Diagnostic:</strong> Dietary chain extraction values identified as elevated. Consider shifting consumer ingestion indexes.`;
    }
}

function updateMarketplaceMetrics(score) {
    elements.marketLiability.textContent = `${score.toFixed(1)} Tons`;
    elements.marketCost.textContent = `$${(score * 14.25).toFixed(2)}`;
}

function purchaseOffset(amt, title) {
    state.marketOffset += amt;
    dispatchToast(`Offset Sponsored: ${title} (-${amt}T)`, "success");
    appendLedgerEntry(`Funded ${title}`, `-${amt}T`);
    processEnvironmentalMatrices();
}

function syncGlobalLeaderboardMatrix(userScore) {
    state.mockGlobalPeers.forEach(peer => {
        if (peer.isUser) {
            peer.score = parseFloat(userScore.toFixed(1));
            peer.status = userScore <= TARGET_GOAL ? "Optimized" : "Unoptimized";
        }
    });

    const sortedPeers = [...state.mockGlobalPeers].sort((a, b) => a.score - b.score);
    
    elements.leaderboardBody.innerHTML = "";
    sortedPeers.forEach((peer, idx) => {
        const row = document.createElement('div');
        row.className = `leaderboard-row ${peer.isUser ? 'user-node-highlight' : ''}`;
        row.innerHTML = `
            <span>#${idx + 1}</span>
            <span>${peer.name}</span>
            <span>${peer.score} Tons</span>
            <span style="color: ${peer.status === 'Optimized' ? 'var(--google-green)' : 'var(--google-red)'}">${peer.status}</span>
        `;
        elements.leaderboardBody.appendChild(row);
    });
}

function evalAchievementMatrix(score) {
    if (state.energy <= 5) {
        if (elements.badgeEfficiency.classList.contains('locked')) {
            elements.badgeEfficiency.className = "badge-slot unlocked";
            dispatchToast("Metric Unlocked: Grid Optimizer Badge ⚡", "success");
            appendLedgerEntry("Unlocked Grid Badge", "COMPLETED");
        }
    } else { elements.badgeEfficiency.className = "badge-slot locked"; }

    if (state.commute * 0.07 < 1.5) {
        if (elements.badgeMobility.classList.contains('locked')) {
            elements.badgeMobility.className = "badge-slot unlocked";
            dispatchToast("Metric Unlocked: Transit Reducer Badge 🚲", "success");
            appendLedgerEntry("Unlocked Transit Badge", "COMPLETED");
        }
    } else { elements.badgeMobility.className = "badge-slot locked"; }

    if (score <= TARGET_GOAL) {
        if (elements.badgeGuardian.classList.contains('locked')) {
            elements.badgeGuardian.className = "badge-slot unlocked";
            dispatchToast("Node Target Clear: Global Carbon Guardian 🏅", "success");
            appendLedgerEntry("Unlocked Guardian Badge", "COMPLETED");
        }
    } else { elements.badgeGuardian.className = "badge-slot locked"; }
}

function updateChartEngine() {
    const ctx = document.getElementById('projectionChart').getContext('2d');
    projectionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [
                { label: 'Target Target Path', data: [12, 10, 8, 6, 4], borderColor: '#1E8E3E', borderDash: [6,6], fill: false, tension: 0.2 },
                { label: 'Your Active Trajectory', data: [0, 0, 0, 0, 0], borderColor: '#1A73E8', backgroundColor: 'rgba(26,115,232,0.06)', fill: true, tension: 0.1 },
                { label: 'Worst-Case Protocol Run', data: [14, 18, 22, 26, 30], borderColor: '#D93025', borderDash: [4,4], fill: false, tension: 0.2 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { boxWidth: 12, font: { weight: 600 } } } },
            scales: {
                y: { grid: { color: 'rgba(128,128,128,0.08)' }, beginAtZero: true },
                x: { grid: { display: false } }
            }
        }
    });
}

function bindInputControllers() {
    elements.commuteSlider.addEventListener('input', (e) => {
        state.commute = parseInt(e.target.value);
        elements.commuteVal.textContent = state.commute;
        processEnvironmentalMatrices();
    });
    elements.commuteSlider.addEventListener('change', () => appendLedgerEntry("Transit Vector Modified", `${state.commute} km`));

    elements.energySlider.addEventListener('input', (e) => {
        state.energy = parseInt(e.target.value);
        elements.energyVal.textContent = state.energy;
        processEnvironmentalMatrices();
    });
    elements.energySlider.addEventListener('change', () => appendLedgerEntry("Grid Load Runtime Shifted", `${state.energy} hrs`));

    elements.dietSlider.addEventListener('input', (e) => {
        state.diet = parseInt(e.target.value);
        elements.dietVal.textContent = state.diet;
        processEnvironmentalMatrices();
    });
    elements.dietSlider.addEventListener('change', () => appendLedgerEntry("Dietary Consumption Index Changed", `${state.diet}/wk`));

    elements.questCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            let sum = 0;
            elements.questCheckboxes.forEach(box => {
                if (box.checked) sum += parseFloat(box.getAttribute('data-reduction'));
            });
            state.questReduction = sum;
            const title = checkbox.getAttribute('data-title');
            dispatchToast(`Matrix Modified: ${title} ${checkbox.checked ? 'Applied' : 'Removed'}`);
            appendLedgerEntry(checkbox.checked ? `Executed ${title}` : `Revoked ${title}`, checkbox.checked ? 'ACTIVE' : 'OFF');
            processEnvironmentalMatrices();
        });
    });

    elements.navItems.forEach(item => {
        item.addEventListener('click', () => {
            elements.navItems.forEach(nav => nav.classList.remove('active'));
            elements.tabContents.forEach(tab => tab.classList.remove('active'));
            item.classList.add('active');
            document.getElementById(item.getAttribute('data-tab')).classList.add('active');
        });
    });

    elements.themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            dispatchToast("System Protocol Configuration: Night-mode Active");
        } else {
            document.documentElement.removeAttribute('data-theme');
            dispatchToast("System Protocol Configuration: Day-mode Active");
        }
    });

    // Fire file download export events
    elements.exportBtn.addEventListener('click', compileAndDownloadAuditLedger);
}

// System initialization sequencing execution
updateChartEngine();
bindInputControllers();
initGeoAffectorSimulation();
processEnvironmentalMatrices();
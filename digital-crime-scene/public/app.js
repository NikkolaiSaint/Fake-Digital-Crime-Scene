const viewer = document.getElementById("viewer");
    const timeline = [
    {
        time: "18:32:04",
        type: "USER LOGIN",
        description: 'User "alex" logged into workstation',
        severity: "NORMAL"
    },

    {
        time: "18:37:12",
        type: "USB CONNECTED",
        description: "Device USB-001 connected",
        severity: "WARNING"
    },

    {
        time: "18:39:42",
        type: "WEB ACTIVITY",
        description: "Suspicious website visited",
        severity: "WARNING"
    },

    {
        time: "18:41:22",
        type: "FILE CREATED",
        description: "strange.exe downloaded",
        severity: "WARNING"
    },

    {
        time: "18:42:03",
        type: "PROGRAM EXECUTED",
        description: "strange.exe started",
        severity: "ERROR"
    },

    {
        time: "18:46:01",
        type: "FILE MODIFIED",
        description: "password.txt modified",
        severity: "WARNING"
    },

    {
        time: "18:47:13",
        type: "FILE DELETED",
        description: "password.txt deleted",
        severity: "ERROR"
    },

    {
        time: "18:51:08",
        type: "USB REMOVED",
        description: "USB-001 disconnected",
        severity: "NORMAL"
    }
];
const evidence = {

    Documents: [
        {
            name: "invoice.pdf",
            type: "PDF Document",
            size: "1.2 MB",
            created: "17:23:14",
            modified: "17:25:02",
            status: "NORMAL"
        },
        {
            name: "notes.txt",
            type: "Text File",
            size: "4 KB",
            created: "18:12:33",
            modified: "18:13:01",
            status: "NORMAL"
        }
    ],

    Downloads: [
        {
            name: "strange.exe",
            type: "Executable",
            size: "248 KB",
            created: "18:41:22",
            modified: "18:42:03",
            status: "SUSPICIOUS",
            hash: "7c9f4b2a91d8e7f3a82d"
        },
        {
            name: "photo.jpg",
            type: "JPEG Image",
            size: "3.4 MB",
            created: "16:42:11",
            modified: "16:42:11",
            status: "NORMAL"
        },
        {
            name: "password.txt",
            type: "Text File",
            size: "2 KB",
            created: "18:45:32",
            modified: "18:46:01",
            status: "DELETED"
        }
    ],

    "Browser History": [
        {
            name: "Unknown Website",
            type: "Web Page",
            created: "18:39:42",
            status: "SUSPICIOUS"
        },
        {
            name: "Google",
            type: "Web Page",
            created: "18:20:11",
            status: "NORMAL"
        }
    ],

    "System Logs": [
        {
            name: "system.log",
            type: "Log File",
            size: "82 KB",
            created: "08:00:00",
            modified: "18:55:32",
            status: "NORMAL"
        }
    ],

    "USB Devices": [
        {
            name: "USB-001",
            type: "USB Storage Device",
            created: "18:37:12",
            status: "SUSPICIOUS"
        }
    ]
};


const buttons = document.querySelectorAll("button");


buttons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.textContent
            .replace("📁 ", "")
            .replace("📥 ", "")
            .replace("🌐 ", "")
            .replace("💾 ", "")
            .replace("🔌 ", "");

        showEvidence(category);

    });

});


function showEvidence(category) {

    const items = evidence[category];

    if (!items) {
        return;
    }

    viewer.innerHTML = `
        <h3>${category}</h3>
        <hr>
        <div id="evidence-list"></div>
    `;

    const list = document.getElementById("evidence-list");

    items.forEach((item, index) => {

        const evidenceButton = document.createElement("button");

        evidenceButton.textContent =
            `${item.name} — ${item.status}`;

        evidenceButton.addEventListener("click", () => {

            showDetails(item);

        });

        list.appendChild(evidenceButton);

    });

}


function showDetails(item) {

    viewer.innerHTML = `

        <h3>${item.name}</h3>

        <hr>

        <p>
            <strong>Type:</strong>
            ${item.type || "Unknown"}
        </p>

        <p>
            <strong>Size:</strong>
            ${item.size || "Unknown"}
        </p>

        <p>
            <strong>Created:</strong>
            ${item.created || "Unknown"}
        </p>

        <p>
            <strong>Modified:</strong>
            ${item.modified || "Unknown"}
        </p>

        <p>
            <strong>Status:</strong>
            ${item.status || "Unknown"}
        </p>

        ${
            item.hash
            ? `<p><strong>SHA-256:</strong><br>${item.hash}</p>`
            : ""
        }

        <br>

        <button onclick="location.reload()">
            ← Back
        </button>

    `;

}

function showTimeline() {

    viewer.innerHTML = `
        <h3>FORENSIC TIMELINE</h3>
        <hr>
        <div id="timeline"></div>
    `;

    const timelineContainer = document.getElementById("timeline");

    timeline.forEach(event => {

        const eventElement = document.createElement("div");

        eventElement.className = "timeline-event";

        eventElement.innerHTML = `
            <div class="timeline-time">
                ${event.time}
            </div>

            <div class="timeline-content">

                <strong>${event.type}</strong>

                <p>${event.description}</p>

                <small>
                    Severity: ${event.severity}
                </small>

            </div>
        `;

        timelineContainer.appendChild(eventElement);

    });
}
const timelineButton = document.getElementById("timeline-button");

timelineButton.addEventListener("click", () => {
    showTimeline();
});
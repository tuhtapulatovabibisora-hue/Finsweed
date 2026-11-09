document.querySelectorAll(".site-header").forEach((header) => {
    const menuButton = header.querySelector(".menu-toggle");
    const navigation = header.querySelector(".primary-nav");

    if (!menuButton || !navigation) {
        return;
    }

    const closeMenu = () => {
        header.dataset.menuOpen = "false";
        menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";
        header.dataset.menuOpen = String(!isOpen);
        menuButton.setAttribute("aria-expanded", String(!isOpen));
    });

    navigation.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
            closeMenu();
            menuButton.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    });
});

document.querySelectorAll(".career-role__tabs").forEach((tabList) => {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

    const activateTab = (tab) => {
        tabs.forEach((currentTab) => {
            const selected = currentTab === tab;
            currentTab.setAttribute("aria-selected", String(selected));
            currentTab.tabIndex = selected ? 0 : -1;

            const panel = document.getElementById(currentTab.getAttribute("aria-controls"));
            if (panel) {
                panel.hidden = !selected;
            }
        });
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => activateTab(tab));
        tab.addEventListener("keydown", (event) => {
            let nextIndex;
            if (event.key === "ArrowRight") {
                nextIndex = (index + 1) % tabs.length;
            } else if (event.key === "ArrowLeft") {
                nextIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = tabs.length - 1;
            } else {
                return;
            }

            event.preventDefault();
            tabs[nextIndex].focus();
            activateTab(tabs[nextIndex]);
        });
    });
});
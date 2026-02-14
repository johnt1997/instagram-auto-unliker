// ==UserScript==
// @name         Instagram Auto Unlike WORKING
// @namespace    http://tampermonkey.net/
// @version      2025-02-15
// @match        https://www.instagram.com/your_activity/interactions/likes/
// @match        https://www.instagram.com/your_activity/interactions/likes/*
// @grant        none
// ==/UserScript==

(async function () {
    'use strict';

    const BATCH_SIZE     = 15;
    const CLICK_DELAY_MS = 150;
    const AFTER_BATCH_MS = 180000;
    const INITIAL_WAIT   = 8000;

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    console.clear();
    console.log('%c SAFE MODE - Updated Auswählen-Fix!', 'background:#ff9800;color:white;font-size:22px;padding:14px;border-radius:14px');

    document.addEventListener('keydown', e => { if (e.key === 'Escape') location.reload(); });

    console.log(`Warte ${INITIAL_WAIT/1000} Sekunden...`);
    await sleep(INITIAL_WAIT);

    let totalUnliked = 0;
    let batchCount = 0;

    while (true) {
        batchCount++;
        console.log(`\n🔄 BATCH #${batchCount} - Bisher ${totalUnliked} Likes entfernt`);

        // 1. "Auswählen" klicken - NEUER FIX
        console.log('Suche Auswählen-Button...');

        let selectBtn = null;

        // Suche nach dem blauen Span mit "Auswählen"
        let blueSpan = [...document.querySelectorAll('span[data-bloks-name="bk.components.Text"]')].find(s => {
            const style = getComputedStyle(s);
            return s.textContent.trim() === 'Auswählen' &&
                   style.color === 'rgb(74, 93, 249)';
        });

        if (blueSpan) {
            selectBtn = blueSpan.parentElement;
            console.log('✓ Auswählen-Span gefunden');
        }

        // Fallback
        if (!selectBtn) {
            selectBtn = [...document.querySelectorAll('button')].find(b =>
                b.textContent.trim() === 'Auswählen'
            );
        }

        if (selectBtn) {
            selectBtn.scrollIntoView({block:"center"});
            await sleep(1000 + Math.random()*500);

            // Klicke
            selectBtn.click();

            // Fallback click
            selectBtn.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            }));

            console.log('✓ Auswählen geklickt');
            await sleep(5000 + Math.random()*2000);
        } else {
            console.log('⚠ Auswählen nicht gefunden');
        }

        // 2. Checkboxes sammeln
        console.log('Sammle Checkboxes...');
        await sleep(3000);

        let circles = [...document.querySelectorAll('div')].filter(div => {
            const m = getComputedStyle(div).maskImage || getComputedStyle(div).webkitMaskImage || '';
            return m.includes('circle') && (m.includes('outline') || m.includes('unfilled') || m.includes('24'));
        });

        console.log(`Circles gefunden: ${circles.length}`);

        let scrolls = 0;
        while (circles.length < BATCH_SIZE && scrolls < 10) {
            window.scrollTo(0, document.body.scrollHeight);
            await sleep(2000 + Math.random()*1000);

            circles = [...document.querySelectorAll('div')].filter(div => {
                const m = getComputedStyle(div).maskImage || getComputedStyle(div).webkitMaskImage || '';
                return m.includes('circle') && (m.includes('outline') || m.includes('unfilled') || m.includes('24'));
            });

            console.log(`Nach Scroll ${scrolls+1}: ${circles.length} Circles`);
            scrolls++;

            if (scrolls > 3 && circles.length === 0) break;
        }

        if (circles.length === 0) {
            console.log('⚠ KEINE CIRCLES - Warte 2 Min');
            await sleep(120000);
            location.reload();
            continue;
        }

        // 3. Checkboxes anklicken
        const toSelect = Math.min(BATCH_SIZE, circles.length);
        console.log(`✓ Wähle ${toSelect} Posts aus...`);

        for (let i = 0; i < toSelect; i++) {
            circles[i].scrollIntoView({block:"center"});
            await sleep(200 + Math.random()*300);
            circles[i].click();
            await sleep(CLICK_DELAY_MS + Math.random()*200);

            if ((i + 1) % 5 === 0) {
                console.log(`  ${i + 1}/${toSelect} ausgewählt...`);
            }
        }

        await sleep(4000 + Math.random()*2000);

        // 4. Unlike-Button 1
        console.log('Suche Unlike-Button 1...');
        let unlike1 = [...document.querySelectorAll('span')].find(s =>
            s.textContent.includes('Gefällt mir nicht mehr') &&
            getComputedStyle(s).color === 'rgb(237, 73, 86)'
        );

        if (unlike1) {
            await sleep(1000 + Math.random()*1000);
            let btn = unlike1.closest('button') || unlike1.parentElement;
            if (btn) {
                btn.click();
                console.log('✓ Unlike-Button 1 geklickt');
                await sleep(4000 + Math.random()*2000);
            }
        } else {
            console.log('⚠ Unlike-Button 1 nicht gefunden');
        }

        // 5. Unlike-Button 2
        console.log('Suche Unlike-Button 2...');

        let unlike2Btn = [...document.querySelectorAll('button._a9--._ap36._a9_1')].find(btn => {
            let div = btn.querySelector('div._aad6');
            return div && div.textContent.trim() === 'Gefällt mir nicht mehr';
        });

        if (!unlike2Btn) {
            let textDiv = [...document.querySelectorAll('div._aad6')].find(d =>
                d.textContent.trim() === 'Gefällt mir nicht mehr'
            );
            if (textDiv) {
                unlike2Btn = textDiv.closest('button');
            }
        }

        if (unlike2Btn) {
            await sleep(1000 + Math.random()*1000);
            unlike2Btn.click();
            console.log('✓ Unlike-Button 2 geklickt');
            await sleep(3000);
            totalUnliked += toSelect;
        } else {
            console.log('⚠ Unlike-Button 2 nicht gefunden');
        }

        const waitTime = AFTER_BATCH_MS + Math.random()*60000;
        console.log(`\n✅ Batch #${batchCount} abgeschlossen!`);
        console.log(`📊 Gesamt: ${totalUnliked} Likes entfernt`);
        console.log(`⏳ Warte ${Math.round(waitTime/60000)} Minuten...`);

        await sleep(waitTime);

        if (batchCount % 5 === 0) {
            console.log('🔄 Reload...');
            location.reload();
        }
    }
})();

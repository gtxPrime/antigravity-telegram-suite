const {
    selectModel,
    sendViaCDP,
    snapshotChatState,
    waitForAgentResponse,
    getFullLatestResponse,
    getChatHeader
} = require('./cdp_controller');

/**
 * Runs the Multi-Agent "Agents Council" workflow.
 * Phase 1: Planning (Claude)
 * Phase 2: Execution (Gemini)
 */
async function runTurboOrchestration(query, CDP_PORT, explicitTargetId, ctx, createProgressHandler, stripQueryFromResponse) {
    let statusMsgId = null;

    try {
        // Send initial status
        const statusMsg = await ctx.reply('🚀 <b>Turbo Mod Başlatıldı:</b>\n\n⏳ <b>Faz 1:</b> Claude planı hazırlıyor...', { parse_mode: 'HTML' });
        statusMsgId = statusMsg.message_id;

        // --- PHASE 1: PLANNING (Claude) ---
        await selectModel(CDP_PORT, "Claude Opus 4.6 (Thinking)");
        
        const pmPrompt = `You are the Project Manager and Lead Architect. Please create a detailed implementation plan for the following request. Do not write the final code, just write the plan and architecture, and define the tasks for the Coder agent.\n\nRequest: ${query}`;
        
        await sendViaCDP(pmPrompt, CDP_PORT, explicitTargetId);
        await new Promise(r => setTimeout(r, 1500));
        await snapshotChatState(CDP_PORT).catch(() => {});
        
        // Wait for Claude to finish
        let isDone = await waitForAgentResponse(CDP_PORT, 600000, createProgressHandler(ctx), explicitTargetId);
        if (!isDone) {
            throw new Error("Claude planlama aşamasında zaman aşımına uğradı.");
        }

        let planText = await getFullLatestResponse(CDP_PORT, explicitTargetId);
        planText = stripQueryFromResponse(planText, pmPrompt);

        // Update Telegram Status
        await ctx.telegram.editMessageText(
            ctx.chat.id,
            statusMsgId,
            null,
            '🚀 <b>Turbo Mod Aktif:</b>\n\n✅ <b>Faz 1:</b> Claude planı tamamladı.\n⏳ <b>Faz 2:</b> Gemini kodları yazıyor...',
            { parse_mode: 'HTML' }
        ).catch(() => {});

        // --- PHASE 2: EXECUTION (Gemini) ---
        await selectModel(CDP_PORT, "Gemini 3.1 Pro (High)");
        
        const coderPrompt = `You are the Lead Developer. The Project Manager has created the following implementation plan. Please execute it strictly, write the necessary code, and fulfill all requirements.\n\nPlan:\n${planText}`;
        
        await sendViaCDP(coderPrompt, CDP_PORT, explicitTargetId);
        await new Promise(r => setTimeout(r, 1500));
        await snapshotChatState(CDP_PORT).catch(() => {});
        
        isDone = await waitForAgentResponse(CDP_PORT, 600000, createProgressHandler(ctx), explicitTargetId);
        if (!isDone) {
            throw new Error("Gemini kodlama aşamasında zaman aşımına uğradı.");
        }

        let finalText = await getFullLatestResponse(CDP_PORT, explicitTargetId);
        finalText = stripQueryFromResponse(finalText, coderPrompt);

        // Final Update
        await ctx.telegram.editMessageText(
            ctx.chat.id,
            statusMsgId,
            null,
            '🚀 <b>Turbo Mod Aktif:</b>\n\n✅ <b>Faz 1:</b> Planlama tamamlandı.\n✅ <b>Faz 2:</b> Kodlama tamamlandı.\n\nSüreç başarıyla bitti! Sonuçlar geliyor...',
            { parse_mode: 'HTML' }
        ).catch(() => {});

        return finalText;

    } catch (err) {
        if (statusMsgId) {
            await ctx.telegram.editMessageText(
                ctx.chat.id,
                statusMsgId,
                null,
                `❌ <b>Turbo Mod Hatası:</b>\n\n${err.message}`,
                { parse_mode: 'HTML' }
            ).catch(() => {});
        }
        throw err;
    }
}

module.exports = {
    runTurboOrchestration
};

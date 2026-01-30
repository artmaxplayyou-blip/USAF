const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1466685966386462732/U7lfP0ty0_v49eHlnw2bsVG1OYTz4msU50L4WFTnpH5uemydMKUVkXfrJx4i9HMeHdWn'; // Замените на реальный URL вашего Discord Webhook


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('usafReportForm');
  const reportStatus = document.getElementById('reportStatus');

  if (!form) {
    console.error('Форма не найдена на странице!');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Собираем данные формы
    const formData = new FormData(form);
    const reportData = {
      fullName: formData.get('fullName'),
      cid: formData.get('cid'),
      rank: formData.get('rank'),
      date: formData.get('date'),
      work: formData.get('work')
    };

    // Формируем payload для Discord
    const payload = {
      embeds: [{
        title: '🏛 Отчёт USAF',
        color: 15158332, // Оранжевый акцент
        fields: [
          { name: '👥 Имя и фамилия', value: reportData.fullName, inline: true },
          { name: '⭐ CID', value: reportData.cid, inline: true },
          { name: '🕒 Звание', value: reportData.rank, inline: true },
          { name: '📅 Дата выполнения', value: reportData.date, inline: true },
          { name: '🎮 Проделанная работа', value: reportData.work, inline: false }
        ],
        timestamp: new Date().toISOString(),
        footer: { text: 'Отправлен через сайт USAF' }
      }]
    };

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        reportStatus.className = 'show success';
        reportStatus.textContent = '✅ Отчёт успешно отправлен в Discord!';
        form.reset();
      } else {
        throw new Error(`Ошибка Discord: ${response.statusText}`);
      }
    } catch (error) {
      reportStatus.className = 'show error';
      reportStatus.textContent = `❌ Ошибка отправки: ${error.message}`;
      console.error('Ошибка при отправке отчёта:', error);
    }
  });
});

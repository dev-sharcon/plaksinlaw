export type Locale = "ru" | "en";

export interface PracticeCategory {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  items: {
    name: string;
    code: string;
    summary: string;
    timeline: string;
  }[];
}

export interface CaseStudy {
  id: string;
  number: string;
  badge: string;
  visaTypes: string[];
  title: string;
  clientRole: string;
  situation: string;
  solution: string[];
  outcome: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  img: string;
  year: string;
}

export interface PressItem {
  name: string;
  topic: string;
  url: string;
  type: string;
}

export const CONTACT_INFO = {
  phoneDisplay: "+1 929 249-00-70",
  phoneHref: "tel:+19292490070",
  telegramHref: "https://t.me/+19292490070",
  whatsappHref: "https://wa.me/19292490070",
  email: "info@plaksinlaw.com",
  zellePhone: "(212) 203-7533",
  consultationBaseUsd: 300,
  consultationCardUsd: 315, // includes 5% card processing fee
  testUrl: "https://usavisatest.com",
  avvoUrl: "https://www.avvo.com/attorneys/10007-ny-andrey-plaksin-3795376.html",
  superLawyersUrl:
    "https://www.superlawyers.com/new-york-metro/lawyer/Andrey-Plaksin/ead98aff-6a99-4b75-bd76-6886dd9e04cc.html",
  embassyUrl: "https://washington.mid.ru/ru/consular-services/consulate/advocates/",
  nyOffice: {
    cityRu: "Офис в Нью-Йорке (Главный офис)",
    cityEn: "New York City Office (Headquarters)",
    address: "225 Broadway, Suite 630, New York, NY 10007",
    districtRu: "Нижний Манхэттен, напротив Сити-Холл и Федерального иммиграционного суда (26 Federal Plaza)",
    districtEn: "Lower Manhattan, steps from City Hall & 26 Federal Plaza USCIS Field Office",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3024.2771662726923!2d-74.0085289!3d40.71191460000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1858b7f283%3A0x547b7df127ab15f1!2zMjI1IEJyb2Fkd2F5ICM2MzAsIE5ldyBZb3JrLCBOWSAxMDAwNywg0KHQqNCQ!5e0!3m2!1sru!2sua!4v1427921701051",
  },
  miamiOffice: {
    cityRu: "Офис в Майами (Флорида)",
    cityEn: "Miami / Aventura Office (Florida)",
    address: "20200 W Dixie Hwy, Suite 902, Aventura, FL 33180",
    districtRu: "Деловой центр Aventura, обслуживание клиентов в Южной Флориде",
    districtEn: "Aventura Business District, serving South Florida clients",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.654033997149!2d-80.1489!3d25.9625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9ad4c4b222c5d%3A0x8c873828b2c99d0!2s20200%20W%20Dixie%20Hwy%20%23902%2C%20Aventura%2C%20FL%2033180!5e0!3m2!1sen!2sus!4v1700000000000",
  },
};

export const SITE_CONTENT = {
  ru: {
    scamWarning:
      "ОСТЕРЕГАЙТЕСЬ МОШЕННИКОВ: ПЕРЕД ОПЛАТОЙ УБЕДИТЕСЬ, ЧТО СВЯЗЫВАЕТЕСЬ С НАШЕЙ ФИРМОЙ ТОЛЬКО ЧЕРЕЗ КОНТАКТНЫЕ ДАННЫЕ, УКАЗАННЫЕ НА PLAKSINLAW.COM",
    nav: {
      practice: "Практика и визы",
      about: "Об адвокате",
      cases: "Примеры дел",
      fees: "Условия и стоимость",
      test: "Оценка шансов",
      contacts: "Контакты",
      consultationBtn: "Консультация",
      payBtn: "Оплатить услуги",
      crmBtn: "CRM-панель",
      switchLang: "English",
    },
    hero: {
      eyebrow: "THE PLAKSIN LAW FIRM, P.C. • NEW YORK & FLORIDA",
      question: "Собираетесь в США?",
      title: "Визовый и иммиграционный адвокат в США Андрей Плаксин",
      subtitle:
        "Персональное правовое сопровождение бизнес-иммиграции, виз для талантливых специалистов, инвесторов и сложных консульских дел без передачи ассистентам.",
      stats: [
        {
          value: "≥ 25%",
          label: "обратившихся за визой в США получают отказ",
          source: "Статистика Госдепартамента США (FY2024)",
          url: "https://travel.state.gov/content/dam/visas/Statistics/Non-Immigrant-Statistics/NIVWorkload/FY2024NIVWorkloadbyVisaCategory.pdf",
        },
        {
          value: "> 50%",
          label: "сокращение выдачи грин-карт гражданам стран СНГ за 10 лет",
          source: "Официальные данные DHS США",
          url: "https://www.dhs.gov/profiles-legal-permanent-residents",
        },
      ],
      statement:
        "Я, Андрей Плаксин, — лицензированный в США визовый и иммиграционный адвокат (штаты Нью-Йорк, Нью-Джерси, Флорида) и меняю эту статистику в пользу своих клиентов.",
      primaryCta: "Оставить заявку на консультацию",
      secondaryCta: "Оплатить услуги",
      quizCta: "Оценить шансы на визу",
      credentialsBar: [
        { label: "Лицензия адвоката США", value: "NY • NJ • FL Bar" },
        { label: "Юридическая степень", value: "J.D. Magna Cum Laude (SUNY)" },
        { label: "Финансовое образование", value: "B.B.A. Accounting (CUNY)" },
        { label: "Рейтинг Avvo", value: "10.0 Superb (90+ отзывов)" },
      ],
    },
    practiceSection: {
      eyebrow: "НАПРАВЛЕНИЯ ПРАКТИКИ",
      title: "Полный спектр иммиграционного права США",
      description:
        "Я работаю во всех направлениях американского иммиграционного законодательства — от петиций для лиц с выдающимися способностями и структурирования инвесторских кейсов до снятия консульских отказов.",
      inquireAction: "Запросить разбор по этой категории",
      categories: [
        {
          id: "immigrant",
          title: "Иммиграция и гражданство США (Green Card)",
          subtitle: "ПМЖ на основании выдающихся способностей, бизнеса, инвестиций и семьи",
          code: "INA § 201–203",
          items: [
            {
              name: "Грин-карта EB-1A и EB-2 NIW для лиц с выдающимися способностями",
              code: "Form I-140",
              summary: "Иммиграция без работодателя в США для ученых, предпринимателей, IT-экспертов, деятелей искусства и спорта.",
              timeline: "Рассмотрение от 15 дней (Premium Processing)",
            },
            {
              name: "Грин-карта EB-1C для международных менеджеров и руководителей",
              code: "Form I-140",
              summary: "Постоянный вид на жительство для собственников и топ-менеджеров при развитии филиала или дочерней компании в США.",
              timeline: "Прямая подача или переход с визы L-1A",
            },
            {
              name: "Грин-карта через инвестиции по программе EB-5",
              code: "Form I-526E",
              summary: "Получение грин-карты для всей семьи через прямые инвестиции или проекты Региональных центров с полным аудитом законности происхождения средств (Source of Funds).",
              timeline: "Инвестиционный статус для всей семьи",
            },
            {
              name: "Грин-карта через брак с гражданином США (CR-1, IR-1)",
              code: "Form I-130 / I-485",
              summary: "Сопровождение супружеских петиций, подготовка доказательственной базы и подготовка пары к перекрестному интервью в USCIS.",
              timeline: "Смена статуса в США или через консульство",
            },
            {
              name: "Грин-карта по воссоединению семьи",
              code: "Form I-130",
              summary: "Воссоединение родителей, детей, супругов и близких родственников граждан и постоянных резидентов США.",
              timeline: "Полный цикл до Национального визового центра",
            },
            {
              name: "Снятие условности с временной грин-карты",
              code: "Form I-751",
              summary: "Переход с двухлетней условной грин-карты на постоянную 10-летнюю, включая сложные случаи развода (Waiver).",
              timeline: "Подача за 90 дней до истечения срока",
            },
            {
              name: "Грин-карта для жертв домашнего насилия (VAWA)",
              code: "Form I-360",
              summary: "Конфиденциальная подача петиции без участия и согласия супруга-абьюзера с полной правовой защитой заявителя.",
              timeline: "Строгая конфиденциальность дела",
            },
            {
              name: "Политическое убежище в США (Asylum)",
              code: "Form I-589",
              summary: "Формирование правовой позиции, работа с экспертными заключениями по стране исхода и представление интересов на интервью.",
              timeline: "Защита в USCIS и иммиграционном суде",
            },
            {
              name: "Натурализация и получение гражданства США",
              code: "Form N-400",
              summary: "Анализ истории поездок и налоговой дисциплины резидента, подача на гражданство и подготовка к интервью.",
              timeline: "Завершающий этап иммиграционного пути",
            },
          ],
        },
        {
          id: "nonimmigrant",
          title: "Неиммиграционные визы и статус в США",
          subtitle: "Рабочие, инвесторские, деловые и учебные визы с правом легального пребывания",
          code: "INA § 101(a)(15)",
          items: [
            {
              name: "Виза O-1 для лиц с выдающимися способностями (и визы сопровождения O-2)",
              code: "Form I-129 (O-1A / O-1B)",
              summary: "Рабочая виза для талантливых специалистов в бизнесе, науке, IT, креативных индустриях, кино и музыке.",
              timeline: "До 3 лет с неограниченным продлением",
            },
            {
              name: "Виза L-1 для перевода руководителей и открытия филиала в США",
              code: "Form I-129L",
              summary: "Открытие нового офиса (New Office L-1A) или перевод действующего топ-менеджера в американскую структуру компании.",
              timeline: "Включает разработку бизнес-плана и регистрацию компании",
            },
            {
              name: "Виза инвестора E-2 (Договорная инвестиционная виза)",
              code: "Form DS-160 / I-129E",
              summary: "Легальное ведение бизнеса и проживание в США при умеренном пороге капиталовложений в действующий или новый бизнес.",
              timeline: "Отличная база для последующего перехода на EB-5",
            },
            {
              name: "Рабочая виза H-1B для дипломированных специалистов",
              code: "Form I-129H / LCA",
              summary: "Оформление петиции от американского работодателя, проверка Prevailing Wage в Министерстве труда США.",
              timeline: "Статус с двойным намерением (Dual Intent)",
            },
            {
              name: "Студенческая виза F-1 и смена статуса на учебный",
              code: "Form I-20 / I-539",
              summary: "Поступление в университеты и колледжи США, обоснование образовательных целей и связей со страной проживания.",
              timeline: "Консульская подача или смена статуса внутри США",
            },
            {
              name: "Виза невесты / жениха гражданина США (K-1)",
              code: "Form I-129F",
              summary: "Въезд в США с целью заключения брака в течение 90 дней и последующей подачи на грин-карту (Adjustment of Status).",
              timeline: "USCIS -> NVC -> Консульское интервью",
            },
            {
              name: "Деловая и туристическая виза B-1 / B-2",
              code: "Form DS-160",
              summary: "Подготовка сложных кейсов для предпринимателей, топ-менеджеров и заявителей со сложной визовой историей.",
              timeline: "Индивидуальная проработка стратегии интервью",
            },
            {
              name: "Продление статуса и медицинская виза (вкл. роды в США)",
              code: "Form I-539 / B-2 Medical",
              summary: "Юридически грамотное оформление поездки на лечение или роды без риска обвинений в нарушении визового режима.",
              timeline: "Сохранение безупречной визовой истории",
            },
          ],
        },
        {
          id: "complex",
          title: "Отказы, RFE и защита в ведомствах США",
          subtitle: "Преодоление отказов 214(b)/212(a), административных проверок 221(g) и запросов USCIS",
          code: "USCIS • DOS • CBP • NVC",
          items: [
            {
              name: "Преодоление отказов в визе по статьям 214(b) и 212(a)",
              code: "INA § 214(b) / § 212(a)",
              summary: "Глубокий аудит причин предыдущего отказа, устранение противоречий в анкетах и подготовка правового меморандума.",
              timeline: "Правовая реабилитация визовой истории",
            },
            {
              name: "Административная проверка по статье 221(g)",
              code: "INA § 221(g)",
              summary: "Сопровождение при запросе дополнительных документов консульством, проверка по технологическим и финансовым критериям.",
              timeline: "Коммуникация с Госдепартаментом и консульствами",
            },
            {
              name: "Подготовка ответа на Request for Evidence (RFE / NOID)",
              code: "USCIS RFE Response",
              summary: "Профессиональное закрытие претензий офицера USCIS по петициям O-1, EB-1, L-1, EB-2 NIW и семейным делам.",
              timeline: "Строгое соблюдение процессуальных сроков",
            },
            {
              name: "Перевод на иммиграционный статус в США (Adjustment of Status)",
              code: "Form I-485",
              summary: "Комплексная подача на грин-карту внутри США без выезда из страны, включая проверку допустимости (Admissibility).",
              timeline: "Подача совместно с I-765 и I-131",
            },
            {
              name: "Разрешение на работу (EAD) и документы Advance Parole / Re-Entry Permit",
              code: "Form I-765 / Form I-131",
              summary: "Оформление права на работу и разрешений на длительное отсутствие в США без потери статуса резидента.",
              timeline: "Защита статуса при международных поездках",
            },
            {
              name: "Подготовка дела в Национальном Визовом Центре (NVC) и сопровождение на интервью",
              code: "NVC / USCIS Field Office",
              summary: "Полная подготовка к интервью в посольствах США по всему миру и личное адвокатское сопровождение на интервью в USCIS.",
              timeline: "Личное присутствие адвоката в офисах USCIS",
            },
          ],
        },
      ] as PracticeCategory[],
    },
    aboutSection: {
      eyebrow: "ОБ АДВОКАТЕ И КВАЛИФИКАЦИИ",
      title: "Андрей Плаксин, Esq.",
      subtitle:
        "Сочетание американского докторского юридического образования и финансового диплома позволяет вести сложные бизнес- и инвестиционные кейсы без привлечения посредников.",
      educationTitle: "Академическое образование в США",
      education: [
        {
          degree: "Степень Доктора Юриспруденции (Juris Doctor, Magna Cum Laude)",
          honors: "Диплом с высоким отличием",
          school: "Факультет Юриспруденции при Нью-Йоркском Государственном Университете (SUNY School of Law)",
        },
        {
          degree: "Степень Бакалавра по Бухгалтерскому Учету и Финансам (B.B.A., Cum Laude)",
          honors: "Диплом с отличием",
          school: "Факультет Бизнеса при Нью-Йоркском Городском Университете (CUNY School of Business)",
        },
      ],
      licensesTitle: "Лицензии и профессиональные ассоциации",
      licensesList: [
        "Действующий член Адвокатской палаты штатов Нью-Йорк, Нью-Джерси и Флорида",
        "Член Американской Ассоциации Адвокатов (American Bar Association — ABA)",
        "Член Американской Ассоциации Иммиграционных Адвокатов (AILA)",
        "Член Ассоциации Адвокатов Штата Нью-Йорк (NYSBA)",
      ],
      advantagesTitle: "Ключевые преимущества для клиентов",
      advantages: [
        {
          num: "01",
          title: "Бизнес- и финансовое образование",
          text: "Большинство моих дел связаны с бизнес-иммиграцией. Высшее бухгалтерское и финансовое образование позволяет мне лично курировать подготовку бизнес-планов, анализ финансовой отчетности, аудит источников капитала (EB-5 / E-2) и корпоративной структуры компании.",
        },
        {
          num: "02",
          title: "Свободное владение русским и английским",
          text: "Со мной Вам не нужен переводчик, который может исказить важные юридические формулировки в документах или некорректно передать речь представителей государственных органов США. Я понимаю Вас во всех смыслах.",
        },
        {
          num: "03",
          title: "Глубокое знание реалий бизнеса в СНГ",
          text: "Деловая и налоговая практика в Украине, России, Казахстане и других странах СНГ кардинально отличается от стандартов США. Я детально знаком с этими рынками и знаю, как правильно презентовать Ваши активы и достижения американским иммиграционным властям.",
        },
      ],
    },
    participationSection: {
      eyebrow: "ПРИНЦИПЫ РАБОТЫ И ГОНОРАРЫ",
      title: "Мое участие в Вашем деле и стоимость услуг",
      lead: "Я работаю честно и гарантирую Вам добросовестное оказание всех юридических услуг в соответствии с наивысшими американскими стандартами адвокатской этики и профессионализма.",
      principles: [
        {
          num: "01",
          title: "Веду дело лично, без ассистентов",
          text: "Я не передаю дела паралигалам или младшим помощникам. Каждая петиция, письмо и правовой меморандум разрабатываются мной лично.",
        },
        {
          num: "02",
          title: "Строгий лимит одновременных дел",
          text: "Я сознательно ограничиваю количество дел в производстве, чтобы уделить Вашему кейсу максимум времени и внимания к деталям.",
        },
        {
          num: "03",
          title: "Отсутствие конфликта интересов",
          text: "Я беру оплату за профессиональные услуги, а не «за результат», что защищает клиента в многоэтапных делах, длящихся более года (свыше половины всех иммиграционных кейсов).",
        },
        {
          num: "04",
          title: "Адвокатская тайна (Attorney-Client Privilege)",
          text: "Полная конфиденциальность всей переданной информации о Вас, Вашей семье, активах и бизнесе гарантирована федеральным законом США.",
        },
        {
          num: "05",
          title: "Защита собственной репутацией",
          text: "Ваш результат защищен моей безупречной репутацией в США — моим главным профессиональным капиталом и рейтингом 10.0 на Avvo.",
        },
        {
          num: "06",
          title: "Фиксированная стоимость по итогам консультации",
          text: "Гонорар рассчитывается индивидуально на основе оценки трудозатрат, сложности и срочности дела и фиксируется в договоре после первичной консультации.",
        },
      ],
      workTitle: "Что конкретно входит в мою работу?",
      workSteps: [
        {
          step: "Этап I",
          title: "Выясняю все обстоятельства дела",
          desc: "На 45-минутной консультации детально разбираю Вашу ситуацию, визовую историю, цели и формирую ориентировочный план действий.",
        },
        {
          step: "Этап II",
          title: "Разрабатываю правовую стратегию",
          desc: "Подробно объясняю все доступные визовые категории, честно предупреждаю о возможных рисках и составляю пошаговую дорожную карту.",
        },
        {
          step: "Этап III",
          title: "Активно контролирую подготовку доказательств",
          desc: "Лично участвую в сборе документов, составлении экспертных и рекомендательных писем, проверке финансовых документов и бизнес-планов.",
        },
        {
          step: "Этап IV",
          title: "Защищаю интересы перед ведомствами США",
          desc: "Представляю клиента перед USCIS, Министерством труда (DOL), Госдепартаментом (DOS), Таможенно-пограничной службой (CBP) и консульствами США по всему миру.",
        },
        {
          step: "Этап V",
          title: "Создаю фундамент для будущего статуса",
          desc: "Успех — это не только одобрение текущей визы или грин-карты, но и безупречный фундамент для последующих этапов вплоть до гражданства США.",
        },
      ],
    },
    casesSection: {
      eyebrow: "АДВОКАТСКАЯ ПРАКТИКА",
      title: "Примеры успешных дел из моей практики",
      subtitle:
        "Реальные истории клиентов (имена изменены в целях соблюдения адвокатской тайны), демонстрирующие стратегический подход к бизнес- и профессиональной иммиграции.",
      situationLabel: "Ситуация и задача клиента",
      solutionLabel: "Правовое решение и действия адвоката",
      outcomeLabel: "Итоговый результат",
      inquireSimilar: "Обсудить похожую ситуацию с адвокатом",
      cases: [
        {
          id: "case-1",
          number: "Дело № 01",
          badge: "Таланты и Креативная индустрия",
          visaTypes: ["O-1B", "O-2", "EB-1A Green Card"],
          title: "Виза О-1 и грин-карта ЕВ-1А: Музыкальный продюсер приглашен в Голливуд",
          clientRole: "Дмитрий — музыкальный продюсер",
          situation:
            "Дмитрий являлся талантливым музыкальным продюсером. В знак признания его таланта он был приглашен сотрудничать с ведущими экспертами музыкальной индустрии в Голливуде. Для этого ему была необходима виза, дающая право жить и работать на территории США в течение нескольких лет вместе с ключевыми участниками его команды.",
          solution: [
            "Успешно доказал Службе гражданства и иммиграции США (USCIS) соответствие Дмитрия строгим критериям визы О-1 на основании его профессиональных достижений.",
            "Сформировал обширное досье доказательств выдающихся способностей в области музыки и подготовил экспертные заключения от лидеров индустрии.",
            "Оформил специальные визы сопровождения О-2 для двух незаменимых членов продюсерской группы Дмитрия на весь срок реализации проекта.",
            "После успеха голливудского проекта подготовил и провел петицию на постоянную грин-карту по категории ЕВ-1А (лица с выдающимися способностями).",
          ],
          outcome: "Одобрены визы O-1, две визы O-2 и постоянная грин-карта EB-1A. Клиент постоянно проживает и работает в Калифорнии.",
        },
        {
          id: "case-2",
          number: "Дело № 02",
          badge: "Международный бизнес и Руководители",
          visaTypes: ["L-1A", "EB-1C Green Card"],
          title: "Виза L-1 и грин-карта ЕВ-1С: Открытие дочерней компании в США",
          clientRole: "Евгений — генеральный директор автохолдинга (30+ сотрудников)",
          situation:
            "Евгений руководил крупным автосалоном элитных автомобилей с пробегом, импортируемых из США через американских посредников. Он принял решение открыть собственное дочернее предприятие в США, чтобы лично контролировать закупку и экспорт без посредников, и переехать в США с семьей.",
          solution: [
            "Разработал стратегию корпоративного трансфера по визе L-1A и подготовил детальную доказательственную базу управленческого опыта Евгения в головной компании и полномочий в американском филиале.",
            "Составил комплексный бизнес-план, обосновывающий экономическую целесообразность открытия американской дочерней структуры.",
            "Оказал практическое содействие в регистрации корпорации в США, аренде коммерческого офиса и подборе лицензированного американского бухгалтера (CPA) для ведения payroll и налоговой отчетности.",
            "На следующем этапе успешно провел петицию ЕВ-1С для международных руководителей.",
          ],
          outcome: "Получена виза L-1A, а затем постоянные грин-карты EB-1C для Евгения, его супруги и двоих детей. Семья проживает в Нью-Йорке.",
        },
        {
          id: "case-3",
          number: "Дело № 03",
          badge: "Инвестиционная иммиграция",
          visaTypes: ["EB-5 ($500k)", "U.S. Citizenship"],
          title: "Грин-карта по программе EB-5 и гражданство США: Переезд семьи инвестора",
          clientRole: "Игорь — предприниматель и инвестор (капитал > $1 млн)",
          situation:
            "Игорь и его супруга приобрели дом в Калифорнии, где супруга с тремя детьми (рожденными в США) проводила много времени по туристической визе B1/B2, пока Игорь управлял бизнесом. После предупреждения от офицера пограничной службы CBP о недопустимости проживания в США по турвизе семья обратилась за легальным статусом постоянного жителя без обязательства лично управлять новым бизнесом в США.",
          solution: [
            "Исключив неподходящий вариант L-1/EB-1C (клиент не планировал открывать филиал), рекомендовал инвестицию через аккредитованный Региональный центр по программе ЕВ-5.",
            "Провел правовой аудит ряда инвестиционных проектов на предмет полного соответствия требованиям USCIS по созданию рабочих мест.",
            "Подготовил исчерпывающее досье о законности источника инвестируемых средств (Source of Funds) на основании истории бизнеса и доходов Игоря.",
            "Спустя установленный законом срок сопроводил семью в процессе снятия условности и натурализации.",
          ],
          outcome: "Одобрена петиция EB-5, получены постоянные грин-карты, а через несколько лет Игорь и его супруга стали гражданами США.",
        },
        {
          id: "case-4",
          number: "Дело № 04",
          badge: "Логистика и Инвестиции",
          visaTypes: ["E-2 Investor", "EB-5 Green Card"],
          title: "От визы инвестора Е-2 к грин-карте ЕВ-5: Инвестиция в американского подрядчика",
          clientRole: "Тимофей — CEO логистической компании",
          situation:
            "Тимофей возглавлял логистическую компанию в Украине, доставляющую товары из США. Чтобы уйти от наценок посредников и получить прямой контракт, он инвестировал первые $70,000 в развитие американского подрядчика-перевозчика. Требовалась виза для регулярного пребывания и управления проектом в США.",
          solution: [
            "Определил оптимальный двухэтапный маршрут: стартовая виза инвестора E-2 (для которой инвестиции $70,000 было уже достаточно) с последующим масштабированием до грин-карты EB-5.",
            "Сформировал пакет корпоративных и инвестиционных договоров, подтвердив реальность операционной деятельности предприятия, и добился одобрения статуса E-2.",
            "Через два года, когда совокупный объем реинвестиций в американский бизнес превысил порог программы EB-5, подготовил петицию на постоянное резидентство.",
          ],
          outcome: "Одобрена виза инвестора E-2, а после масштабирования логистического бизнеса в США — получена грин-карта по программе EB-5.",
        },
        {
          id: "case-5",
          number: "Дело № 05",
          badge: "Профессиональный спорт",
          visaTypes: ["P-1A Athlete", "P-4 Family"],
          title: "Виза Р-1 и семейные визы Р-4: Приглашение профессионального спортсмена в США",
          clientRole: "Борис — спортсмен международного уровня",
          situation:
            "Известный российский спортсмен получил двухлетний контракт на работу в США. Требовалось оперативно оформить рабочую визу для него, а также статус сопровождения для супруги и маленького сына в условиях языкового барьера с американским клубом-работодателем.",
          solution: [
            "Квалифицировал кейс по категории P-1A на основании участия в международных турнирах в составе национальной сборной и международного спортивного признания.",
            "Взял на себя полную координацию и двуязычную правовую коммуникацию с американским работодателем-петиционером.",
            "Сформировал доказательственную базу спортивных регалий и сопроводил получение виз P-4 для членов семьи.",
          ],
          outcome: "Успешно одобрена рабочая виза P-1A для спортсмена и визы P-4 для его супруги и сына.",
        },
        {
          id: "case-6",
          number: "Дело № 06",
          badge: "Стратегическое планирование",
          visaTypes: ["H-1B", "E-2", "L-1A", "EB-5"],
          title: "Комплексный сравнительный разбор: Выпускница университета США и семейный капитал",
          clientRole: "Ирина — выпускница американского вуза и ее семья",
          situation:
            "Ирина завершала обучение в американском колледже и планировала остаться работать в США с перспективой получения грин-карты. Одновременно ее семья рассматривала открытие филиала зарубежного бизнеса в США. Клиенту требовался объективный аудит всех четырех возможных путей: H-1B, E-2, L-1A и EB-5.",
          solution: [
            "Сценарий №1 (EB-5 через Региональный центр): Рекомендован как наиболее прямой путь к грин-карте без привязки к работодателю, с детальным разъяснением инвестиционных рисков.",
            "Сценарий №2 (Виза инвестора E-2): Определен как оптимальный по соотношению затрат и гибкости для запуска собственного бизнеса в США без полумиллионных вложений.",
            "Сценарий №3 (Рабочая виза H-1B): Разъяснены требования по Prevailing Wage в штате Нью-Йорк и сложность последующего доказывания незаменимости сотрудника (PERM).",
            "Сценарий №4 (Виза руководителя L-1A): Честно указан как наименее целесообразный для вчерашней студентки, за исключением покупки готового бизнеса в США с действующим штатом сотрудников.",
          ],
          outcome: "Семья получила честную, финансово выверенную дорожную карту без навязывания дорогостоящих и рискованных процедур.",
        },
      ] as CaseStudy[],
    },
    quizSection: {
      eyebrow: "ПРЕДВАРИТЕЛЬНАЯ ДИАГНОСТИКА КЕЙСА",
      title: "Какие у Вас шансы получить визу или грин-карту в США?",
      subtitle:
        "Пройдите краткую предварительную оценку Вашей ситуации прямо на сайте (результат сразу поступит адвокату) или воспользуйтесь моим развернутым авторским тестом на usavisatest.com.",
      startInlineBtn: "Пройти экспресс-оценку (1 мин)",
      externalTestBtn: "Перейти на usavisatest.com",
    },
    awardsSection: {
      eyebrow: "ПРИЗНАНИЕ И МЕДИА",
      title: "Рейтинги, награды и публикации в прессе",
      subtitle:
        "Экспертные комментарии Андрея Плаксина по вопросам американского иммиграционного права регулярно публикуются в деловых СМИ и в эфире международных телеканалов.",
      avvoRatingTitle: "Максимальный рейтинг Avvo 10.0 Superb",
      avvoReviewsTitle: "Выбор клиентов Avvo (90+ верифицированных отзывов)",
    },
    faqSection: {
      eyebrow: "ЧАСТЫЕ ВОПРОСЫ (FAQ)",
      title: "Ответы на ключевые вопросы перед консультацией",
      items: [
        {
          q: "Как проходит первичная консультация и сколько она стоит?",
          a: "Работа всегда начинается с 45-минутной дистанционной консультации (Zoom, WhatsApp, Telegram или телефон). Стоимость составляет 300 USD (при оплате картой через сайт — 315 USD с учетом 5% комиссии платежной системы, либо 300 USD без комиссии через Zelle). Эта сумма полностью засчитывается в стоимость дальнейших юридических услуг при заключении договора.",
        },
        {
          q: "Передаете ли Вы дела помощникам или паралигалам после оплаты?",
          a: "Нет. Принципиальное отличие моей практики — личное ведение каждого дела от первичного анализа до подачи петиции и интервью. Я сознательно ограничиваю число одновременных дел, чтобы гарантировать личный контроль.",
        },
        {
          q: "Работаете ли Вы с клиентами за пределами Нью-Йорка и США?",
          a: "Да. Иммиграционное право США является федеральным, поэтому я официально представляю клиентов во всех 50 штатах США, а также в американских посольствах и консульствах по всему миру.",
        },
        {
          q: "Можно ли получить визу или грин-карту после отказов по статье 214(b)?",
          a: "Да. Отказ по статье 214(b) означает, что заявитель не смог юридически убедительно преодолеть презумпцию иммиграционных намерений в конкретной подаче. Мы проводим аудит предыдущих анкет DS-160, выявляем слабые места и выстраиваем новую правовую стратегию.",
        },
      ],
    },
    footer: {
      disclaimer:
        "Информация на данном сайте носит исключительно ознакомительный характер и не является индивидуальной юридической консультацией. Отношения «адвокат-клиент» возникают только после подписания письменного соглашения.",
      copyright: "© The Plaksin Law Firm, P.C., 2026. Все права защищены.",
      intellectualProperty:
        "Контент данного сайта является интеллектуальной собственностью The Plaksin Law Firm, P.C. Воспроизведение материалов без письменного разрешения запрещено.",
    },
  },
  en: {
    scamWarning:
      "BEWARE OF SCAMS: BEFORE MAKING A PAYMENT, ENSURE THAT YOU ARE CONTACTING OUR FIRM ONLY THROUGH THE CONTACT INFORMATION PROVIDED ON PLAKSINLAW.COM",
    nav: {
      practice: "Practice Areas",
      about: "About Attorney",
      cases: "Representative Cases",
      fees: "Role & Fees",
      test: "Visa Assessment",
      contacts: "Contact Us",
      consultationBtn: "Book Consultation",
      payBtn: "Make a Payment",
      crmBtn: "Attorney CRM",
      switchLang: "Русская версия",
    },
    hero: {
      eyebrow: "THE PLAKSIN LAW FIRM, P.C. • NEW YORK & FLORIDA",
      question: "Going to the USA?",
      title: "U.S. Visa & Immigration Attorney Andrey Plaksin",
      subtitle:
        "Direct, personal legal representation in complex business immigration, extraordinary ability petitions, investor visas, and consular proceedings—never delegated to paralegals.",
      stats: [
        {
          value: "≥ 25%",
          label: "of U.S. nonimmigrant visa applicants receive a refusal",
          source: "U.S. Department of State Statistics (FY2024)",
          url: "https://travel.state.gov/content/dam/visas/Statistics/Non-Immigrant-Statistics/NIVWorkload/FY2024NIVWorkloadbyVisaCategory.pdf",
        },
        {
          value: "> 50%",
          label: "decrease in Green Cards issued to citizens of CIS countries over 10 years",
          source: "Official U.S. DHS Yearbook Data",
          url: "https://www.dhs.gov/profiles-legal-permanent-residents",
        },
      ],
      statement:
        "I, Andrey Plaksin, am a U.S. visa and immigration attorney (admitted in NY, NJ, and FL) dedicated to changing these statistics. I live in the United States and am fluent in English and Russian.",
      primaryCta: "Submit an Inquiry",
      secondaryCta: "Make a Payment",
      quizCta: "Assess Your Visa Chances",
      credentialsBar: [
        { label: "Bar Admissions", value: "NY • NJ • FL Bar" },
        { label: "Law Degree", value: "J.D. Magna Cum Laude (SUNY)" },
        { label: "Business Degree", value: "B.B.A. Accounting (CUNY)" },
        { label: "Avvo Rating", value: "10.0 Superb (90+ Reviews)" },
      ],
    },
    practiceSection: {
      eyebrow: "PRACTICE AREAS",
      title: "Comprehensive U.S. Immigration Representation",
      description:
        "My practice is focused on all aspects of U.S. federal immigration and nationality law—from extraordinary ability and multinational executive petitions to investor structuring and overcoming consular refusals.",
      inquireAction: "Inquire about this visa category",
      categories: [
        {
          id: "immigrant",
          title: "Immigration & U.S. Citizenship (Green Cards)",
          subtitle: "Lawful Permanent Residence through extraordinary ability, investment, business, and family",
          code: "INA § 201–203",
          items: [
            {
              name: "Green Card for Individuals with Extraordinary Ability (EB-1A / EB-2 NIW)",
              code: "Form I-140",
              summary: "Self-sponsored permanent residence for accomplished researchers, entrepreneurs, executives, artists, and athletes without employer sponsorship.",
              timeline: "15-day Premium Processing available",
            },
            {
              name: "Green Card for Multinational Managers and Executives (EB-1C)",
              code: "Form I-140",
              summary: "Permanent residence for business owners and senior executives transferring to manage a U.S. parent, subsidiary, or affiliate entity.",
              timeline: "Direct filing or transition from L-1A status",
            },
            {
              name: "Green Card for Investors (EB-5 Immigrant Investor Program)",
              code: "Form I-526E",
              summary: "Permanent residency for the investor, spouse, and unmarried children under 21 via Regional Center or direct enterprise investment with full Source of Funds auditing.",
              timeline: "Direct path to permanent residency",
            },
            {
              name: "Green Card for Spouse of a U.S. Citizen (CR-1 / IR-1)",
              code: "Form I-130 / I-485",
              summary: "Marriage-based petitions, bona fide relationship documentation, and rigorous preparation for USCIS interviews.",
              timeline: "Adjustment of Status or Consular Processing",
            },
            {
              name: "Green Card Based on Family Reunification",
              code: "Form I-130",
              summary: "Sponsorship of parents, children, spouses, and siblings by U.S. citizens and Lawful Permanent Residents.",
              timeline: "Full representation through NVC & Embassy",
            },
            {
              name: "Removal of Conditions on Residence",
              code: "Form I-751",
              summary: "Transitioning from a 2-year conditional Green Card to a 10-year permanent card, including complex good-faith marriage waivers.",
              timeline: "Filed within 90 days prior to expiration",
            },
            {
              name: "Green Card for Victims of Domestic Violence (VAWA)",
              code: "Form I-360",
              summary: "Confidential self-petitioning under the Violence Against Women Act without the abuser's knowledge or participation.",
              timeline: "Strict statutory confidentiality",
            },
            {
              name: "Political Asylum in the United States",
              code: "Form I-589",
              summary: "Comprehensive legal briefs, country conditions evidence, and representation before USCIS Asylum Offices.",
              timeline: "Affirmative & defensive asylum counsel",
            },
            {
              name: "Naturalization & U.S. Citizenship",
              code: "Form N-400",
              summary: "Review of physical presence, continuous residence, good moral character, and interview representation.",
              timeline: "Final milestone of U.S. immigration",
            },
          ],
        },
        {
          id: "nonimmigrant",
          title: "Nonimmigrant Visas & Status in the U.S.",
          subtitle: "Work, treaty investor, executive transfer, academic, and visitor visas",
          code: "INA § 101(a)(15)",
          items: [
            {
              name: "O-1 Visa for Individuals with Extraordinary Ability (and O-2 Support Team)",
              code: "Form I-129 (O-1A / O-1B)",
              summary: "Nonimmigrant work authorization for top professionals in science, business, technology, arts, motion picture, and music.",
              timeline: "Granted up to 3 years with unlimited extensions",
            },
            {
              name: "L-1 Visa for Intracompany Transferees (Managers & Executives)",
              code: "Form I-129L",
              summary: "Launching a new U.S. branch/subsidiary (New Office L-1A) or transferring senior executives to an existing U.S. entity.",
              timeline: "Includes corporate setup & business plan review",
            },
            {
              name: "E-2 Treaty Investor Visa",
              code: "Form DS-160 / I-129E",
              summary: "Flexible U.S. residency and work authorization based on a substantial investment in a new or acquired U.S. enterprise.",
              timeline: "Ideal stepping stone toward EB-5 Green Card",
            },
            {
              name: "H-1B Specialty Occupation Work Visa",
              code: "Form I-129H / LCA",
              summary: "Employer-sponsored petitions for degreed professionals, including Department of Labor Prevailing Wage & LCA compliance.",
              timeline: "Dual-intent status allowing Green Card pursuit",
            },
            {
              name: "F-1 Academic Student Visa & Change of Status",
              code: "Form I-20 / I-539",
              summary: "University and college admissions support, consular interview preparation, and in-country change of nonimmigrant status.",
              timeline: "Consular processing or USCIS Form I-539",
            },
            {
              name: "K-1 Fiancé(e) Visa",
              code: "Form I-129F",
              summary: "Bringing a foreign fiancé(e) of a U.S. citizen to the United States for marriage within 90 days and subsequent Green Card filing.",
              timeline: "USCIS -> NVC -> Embassy Interview",
            },
            {
              name: "B-1 / B-2 Business & Visitor Visas",
              code: "Form DS-160",
              summary: "Strategic preparation for business executives, frequent travelers, and applicants with complex prior travel profiles.",
              timeline: "Tailored consular interview strategy",
            },
            {
              name: "Extension of Stay & Medical Visas (Including Birth in the U.S.)",
              code: "Form I-539 / B-2 Medical",
              summary: "Lawful extension of nonimmigrant status and compliant documentation for medical treatment and childbirth in the U.S.",
              timeline: "Protects future visa eligibility",
            },
          ],
        },
        {
          id: "complex",
          title: "Refusals, RFEs & Agency Representation",
          subtitle: "Overcoming 214(b)/212(a) denials, 221(g) administrative processing, and USCIS RFEs",
          code: "USCIS • DOS • CBP • NVC",
          items: [
            {
              name: "Overcoming 214(b) and 212(a) Visa Refusals",
              code: "INA § 214(b) / § 212(a)",
              summary: "Forensic audit of prior applications, resolving inadmissibility grounds, and preparing persuasive legal briefs for re-application.",
              timeline: "Rehabilitation of consular record",
            },
            {
              name: "221(g) Administrative Processing Resolution",
              code: "INA § 221(g)",
              summary: "Guidance through prolonged security/background checks and consular document requests worldwide.",
              timeline: "Direct liaison with U.S. Consulates",
            },
            {
              name: "Responding to Requests for Evidence (RFE) & NOIDs",
              code: "USCIS RFE Response",
              summary: "Comprehensive legal and evidentiary responses to complex USCIS challenges in EB-1, O-1, L-1, NIW, and family petitions.",
              timeline: "Strict statutory deadline compliance",
            },
            {
              name: "Adjustment of Status in the United States",
              code: "Form I-485",
              summary: "Transitioning from nonimmigrant status to Lawful Permanent Resident inside the U.S. without departing the country.",
              timeline: "Filed concurrently with EAD & Advance Parole",
            },
            {
              name: "Employment Authorization (EAD), Advance Parole & Re-Entry Permits",
              code: "Form I-765 / Form I-131",
              summary: "Securing work permits and travel documents to protect permanent residence during extended international travel.",
              timeline: "Preserves LPR status abroad",
            },
            {
              name: "NVC Case Preparation & Personal Accompaniment to USCIS Interviews",
              code: "NVC / USCIS Field Office",
              summary: "End-to-end National Visa Center processing, embassy interview coaching, and personal attorney presence at USCIS interviews.",
              timeline: "In-person representation at USCIS offices",
            },
          ],
        },
      ] as PracticeCategory[],
    },
    aboutSection: {
      eyebrow: "ATTORNEY CREDENTIALS",
      title: "Andrey Plaksin, Esq.",
      subtitle:
        "Combining a Juris Doctor degree (Magna Cum Laude) with a degree in Accounting & Finance allows me to handle sophisticated corporate, investment, and extraordinary ability matters with precision.",
      educationTitle: "Academic Education",
      education: [
        {
          degree: "Juris Doctor Degree (Magna Cum Laude)",
          honors: "Graduated with High Honors",
          school: "State University of New York (SUNY), School of Law",
        },
        {
          degree: "Bachelor of Business Administration in Accounting (Cum Laude)",
          honors: "Graduated with Honors",
          school: "City University of New York (CUNY), School of Business",
        },
      ],
      licensesTitle: "Bar Admissions & Professional Associations",
      licensesList: [
        "Admitted to practice in the State of New York, New Jersey, and Florida",
        "Member of the American Bar Association (ABA)",
        "Member of the American Immigration Lawyers Association (AILA)",
        "Member of the New York State Bar Association (NYSBA)",
      ],
      advantagesTitle: "Distinctive Benefits of My Practice",
      advantages: [
        {
          num: "01",
          title: "Business & Accounting Education",
          text: "I handle a high volume of business-related immigration matters. My accounting and business degree allows me to directly assist clients in preparing and reviewing business plans, analyzing financial statements, auditing lawful source of funds, and examining corporate incorporation documents.",
        },
        {
          num: "02",
          title: "Native Fluency in Russian & English",
          text: "When working with me, you will never require a translator or interpreter who might distort critical legal nuances or complicate communication with U.S. government agencies. I understand your background and objectives in every sense.",
        },
        {
          num: "03",
          title: "Deep Knowledge of CIS Business Practices",
          text: "Business, tax, and corporate practices in Ukraine, Russia, and CIS countries differ vastly from those in the United States. My familiarity with both markets enables me to bridge the evidentiary gap for U.S. immigration adjudicators.",
        },
      ],
    },
    participationSection: {
      eyebrow: "ENGAGEMENT & LEGAL FEES",
      title: "My Role in Your Case and Legal Fees",
      lead: "I work honestly and guarantee conscientious performance of all legal services in accordance with the highest U.S. professionalism and ethical standards.",
      principles: [
        {
          num: "01",
          title: "Personal Handling—Zero Delegation",
          text: "I personally work on my clients' cases from start to finish and never delegate legal drafting or strategy to assistants or paralegals.",
        },
        {
          num: "02",
          title: "Strictly Limited Caseload",
          text: "I intentionally cap my active caseload in order to devote my full personal attention to each client matter.",
        },
        {
          num: "03",
          title: "No Conflict of Interest",
          text: "I do not charge contingency fees, preventing conflicts of interest in multi-stage cases (more than half of immigration cases involve multiple stages over 1+ years).",
        },
        {
          num: "04",
          title: "Strict Attorney-Client Confidentiality",
          text: "All information regarding you, your family, your business, and your case is protected under strict federal attorney-client privilege.",
        },
        {
          num: "05",
          title: "Protected by My Reputation",
          text: "The outcome of your case is backed by my professional reputation in the United States, which is my greatest asset.",
        },
        {
          num: "06",
          title: "Transparent Flat-Rate Legal Fees",
          text: "Legal fees are based on estimated hours, complexity, and urgency. I typically charge predictable flat-rate fees determined at the conclusion of our initial consultation.",
        },
      ],
      workTitle: "What Exactly Do My Legal Services Include?",
      workSteps: [
        {
          step: "Stage I",
          title: "Comprehensive Case Analysis",
          desc: "During the initial consultation, I meet with my client to review goals, prior immigration history, and all facts to formulate a tentative action plan.",
        },
        {
          step: "Stage II",
          title: "Effective Legal Strategy",
          desc: "I evaluate all available visa options, candidly explain associated risks, and build a step-by-step roadmap to achieve the desired result.",
        },
        {
          step: "Stage III",
          title: "Active Control of Case Preparation",
          desc: "I personally guide the gathering, structuring, and review of all documentary evidence, financial records, and expert letters.",
        },
        {
          step: "Stage IV",
          title: "Representation Before U.S. Agencies",
          desc: "I represent clients before USCIS, the U.S. Department of Labor, the U.S. Department of State, U.S. Customs and Border Protection, and U.S. Embassies worldwide.",
        },
        {
          step: "Stage V",
          title: "Long-Term Immigration Foundation",
          desc: "Success is not merely the approval of a single visa, but the creation of a compliant foundation for all future statuses up to U.S. citizenship.",
        },
      ],
    },
    casesSection: {
      eyebrow: "REPRESENTATIVE MATTERS",
      title: "Selected Representative Cases",
      subtitle:
        "Real client matters (first names used to preserve confidentiality) illustrating strategic solutions across extraordinary ability, executive transfer, and investment categories.",
      situationLabel: "Client Problem & Background",
      solutionLabel: "Legal Strategy & Execution",
      outcomeLabel: "Final Outcome",
      inquireSimilar: "Discuss a similar case with Attorney Plaksin",
      cases: [
        {
          id: "case-1",
          number: "Case 01",
          badge: "Extraordinary Ability • Entertainment",
          visaTypes: ["O-1B", "O-2", "EB-1A Green Card"],
          title: "O-1 Visa & EB-1A Green Card: Music Producer Invited to Work in Hollywood",
          clientRole: "Dmitry — Acclaimed Music Producer",
          situation:
            "Dmitry was a talented music producer invited to collaborate with top music industry experts in Hollywood. He required a visa granting him the right to live and work in the United States for several years, along with essential members of his production team.",
          solution: [
            "Demonstrated to U.S. Citizenship and Immigration Services (USCIS) that Dmitry met the rigorous evidentiary criteria for an O-1B visa based on his industry achievements.",
            "Compiled extensive documentation of his extraordinary ability in music and detailed testimonial letters from recognized industry leaders.",
            "Secured specialized O-2 accompanying visas for two essential members of Dmitry's production team for the duration of his U.S. project.",
            "Following the project's commercial success in Hollywood, prepared and won an EB-1A petition for permanent residence.",
          ],
          outcome: "O-1B visa, two O-2 team visas, and EB-1A Green Card approved. Client resides permanently in California.",
        },
        {
          id: "case-2",
          number: "Case 02",
          badge: "Multinational Executive Transfer",
          visaTypes: ["L-1A", "EB-1C Green Card"],
          title: "L-1 Visa & EB-1C Green Card: Launch of a U.S. Subsidiary",
          clientRole: "Evgeniy — CEO of Luxury Automotive Dealership (30+ Employees)",
          situation:
            "Evgeniy was the CEO of a mid-size luxury pre-owned car dealership supervising over 30 employees. His company imported vehicles from the U.S. through intermediaries. When he decided to establish a U.S. subsidiary to engage in direct import/export operations, he needed executive work authorization and a path to relocate his family.",
          solution: [
            "Structured an L-1A intracompany executive petition documenting Evgeniy's executive authority at the parent company and proposed executive role at the U.S. subsidiary.",
            "Prepared a comprehensive five-year business plan substantiating the operational and financial need for the U.S. entity.",
            "Assisted with U.S. corporate incorporation, commercial office lease compliance, and onboarding a CPA for bookkeeping, payroll, and tax filings.",
            "Subsequently petitioned for permanent residency under the EB-1C multinational executive classification.",
          ],
          outcome: "L-1A visa approved, followed by EB-1C Green Cards for Evgeniy, his spouse, and two minor children in New York City.",
        },
        {
          id: "case-3",
          number: "Case 03",
          badge: "EB-5 Immigrant Investor",
          visaTypes: ["EB-5 ($500k)", "U.S. Citizenship"],
          title: "EB-5 Green Card & Naturalization: Family Relocation Through Investment",
          clientRole: "Igor — Entrepreneur & High-Net-Worth Investor",
          situation:
            "Igor was a businessman with a net worth exceeding $1M USD and three U.S.-born children. After purchasing a home in California, his wife and children spent extended periods in the U.S. on B-1/B-2 visitor visas while Igor ran his business abroad. After a CBP officer admonished his wife for spending too much time in the U.S. on a visitor visa, the couple sought permanent residence without having to manage a U.S. subsidiary day-to-day.",
          solution: [
            "Ruled out L-1A/EB-1C since Igor had no desire to operate a U.S. branch, recommending a Regional Center investment under the EB-5 program.",
            "Conducted due diligence on Regional Center project documentation to verify full compliance with USCIS job-creation requirements.",
            "Compiled an exhaustive lawful Source of Funds portfolio auditing Igor's employment history, corporate dividends, and financial statements.",
            "Represented the family through Removal of Conditions and ultimately U.S. Naturalization.",
          ],
          outcome: "EB-5 Green Cards approved; several years later, Igor and his spouse became naturalized U.S. citizens.",
        },
        {
          id: "case-4",
          number: "Case 04",
          badge: "Logistics & Treaty Investment",
          visaTypes: ["E-2 Investor", "EB-5 Green Card"],
          title: "E-2 Investor Visa to EB-5 Green Card: Investment in U.S. Freight Forwarder",
          clientRole: "Tim — CEO of International Logistics Company",
          situation:
            "Tim was the CEO of a logistics company delivering cargo ordered from the United States. To eliminate intermediaries and reduce shipping costs, he invested over $70,000 into a U.S. freight forwarding entity and needed the right to live and work in the United States.",
          solution: [
            "Identified the E-2 Treaty Investor visa as the optimal initial classification—leveraging his $70,000 capital commitment while laying the groundwork for a future EB-5 transition.",
            "Prepared corporate, financial, and operational documentation proving the enterprise was active and more than marginal, securing E-2 approval.",
            "Two years later, after Tim expanded U.S. export operations and his cumulative investment surpassed $500,000, filed and won his EB-5 Green Card petition.",
          ],
          outcome: "E-2 investor status granted, successfully scaled into a permanent Green Card under the EB-5 program.",
        },
        {
          id: "case-5",
          number: "Case 05",
          badge: "International Athletics",
          visaTypes: ["P-1A Athlete", "P-4 Family"],
          title: "P-1A & P-4 Visas: Prominent International Athlete Invited to the U.S.",
          clientRole: "Boris — International National Team Athlete",
          situation:
            "Boris, a prominent athlete, received a two-year contract to work in the United States and needed work authorization for himself and derivative status for his wife and toddler son.",
          solution: [
            "Established eligibility under the P-1A classification based on his participation in international competitions with the national team and international recognition.",
            "Collaborated directly with the U.S. sponsoring employer and bridged the language barrier throughout contract and petition preparation.",
            "Secured P-1A approval for Boris followed by P-4 accompanying visas for his wife and son.",
          ],
          outcome: "P-1A work visa and family P-4 visas approved without delay.",
        },
        {
          id: "case-6",
          number: "Case 06",
          badge: "Strategic Advisory",
          visaTypes: ["H-1B", "E-2", "L-1A", "EB-5"],
          title: "Multi-Option Strategic Evaluation: U.S. College Graduate & Family Business",
          clientRole: "Irina — U.S. University Senior & Family Enterprise",
          situation:
            "Irina was completing her U.S. college degree and sought long-term work authorization and a Green Card. Her family also considered opening a U.S. subsidiary of their foreign company where she had previously worked. They requested an objective evaluation of H-1B, E-2, L-1A, and EB-5 options.",
          solution: [
            "Option 1 (EB-5 Regional Center): Identified as the most direct path to an unconditional Green Card without employer dependency, noting capital at-risk requirements.",
            "Option 2 (E-2 Investor Visa): Highlighted as the most cost-effective path for operating her own U.S. business with a moderate investment threshold.",
            "Option 3 (H-1B Work Visa): Detailed New York prevailing wage requirements, lottery constraints, and PERM labor certification hurdles.",
            "Option 4 (L-1A Executive): Candidly advised against a startup L-1A given high overhead, unless the foreign parent acquired an existing staffed U.S. business.",
          ],
          outcome: "Delivered an actionable, transparent legal roadmap tailored to the family's capital and timeline.",
        },
      ] as CaseStudy[],
    },
    quizSection: {
      eyebrow: "PRELIMINARY CASE EVALUATION",
      title: "What Are Your Chances of Getting a U.S. Visa or Green Card?",
      subtitle:
        "Complete a 1-minute preliminary evaluation right here (your profile is sent directly to the attorney's CRM) or take the comprehensive assessment at usavisatest.com.",
      startInlineBtn: "Start 1-Minute Assessment",
      externalTestBtn: "Visit usavisatest.com",
    },
    awardsSection: {
      eyebrow: "RECOGNITION & MEDIA",
      title: "Awards, Ratings & Press Coverage",
      subtitle:
        "Andrey Plaksin is rated 10.0 Superb on Avvo, selected to Super Lawyers, and frequently featured in major business publications and television networks.",
      avvoRatingTitle: "10.0 Superb Avvo Rating",
      avvoReviewsTitle: "Avvo Clients' Choice (90+ Verified Client Reviews)",
    },
    faqSection: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Key Information Before Your Consultation",
      items: [
        {
          q: "How does the initial consultation work and what is the fee?",
          a: "My work always begins with a 45-minute remote consultation (via Zoom, WhatsApp, Telegram, or telephone) during which I evaluate all options and associated risks. The consultation fee is $300 USD ($315 USD when paid by credit card due to the 5% processing fee, or $300 USD via Zelle with zero fee). This fee is 100% credited toward future legal services if you retain our firm.",
        },
        {
          q: "Will my case be delegated to paralegals or junior assistants?",
          a: "Never. I personally handle every client case from initial strategy to petition drafting and agency representation. I strictly limit my caseload to ensure direct attorney attention.",
        },
        {
          q: "Can you represent clients located outside New York or outside the U.S.?",
          a: "Yes. Because U.S. immigration law is federal, I represent clients across all 50 U.S. states and before U.S. Embassies and Consulates worldwide.",
        },
        {
          q: "Can you help after a prior 214(b) or 212(a) visa refusal?",
          a: "Yes. We conduct a thorough audit of your prior DS-160 filings and consular interview record, address statutory grounds of refusal, and prepare a comprehensive legal strategy for re-application.",
        },
      ],
    },
    footer: {
      disclaimer:
        "Attorney Advertising. The information on this website is for general informational purposes only and does not constitute legal advice. No attorney-client relationship is formed prior to signing a written retainer agreement.",
      copyright: "© The Plaksin Law Firm, P.C., 2026. All rights reserved.",
      intellectualProperty:
        "All content on this website is the intellectual property of The Plaksin Law Firm, P.C. Reproduction of any content is strictly prohibited.",
    },
  },
};

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "ny-bar",
    title: "Supreme Court of the State of New York",
    issuer: "Admitted to Practice Law — State of New York",
    img: "/img/cert-ny.png",
    year: "New York Bar",
  },
  {
    id: "nj-bar",
    title: "Supreme Court of New Jersey",
    issuer: "Admitted to Practice Law — State of New Jersey",
    img: "/img/cert-nj.png",
    year: "New Jersey Bar",
  },
  {
    id: "fl-bar",
    title: "Supreme Court of Florida",
    issuer: "Admitted to Practice Law — State of Florida",
    img: "/img/cert-fl.png",
    year: "Florida Bar",
  },
  {
    id: "aba",
    title: "American Bar Association (ABA)",
    issuer: "Business Law Section Membership",
    img: "/img/cert-aba.png",
    year: "ABA Member",
  },
  {
    id: "aila",
    title: "American Immigration Lawyers Association",
    issuer: "Official AILA Member in Good Standing",
    img: "/img/cert-aila.png",
    year: "AILA Member",
  },
  {
    id: "nysba",
    title: "New York State Bar Association",
    issuer: "NYSBA Official Member",
    img: "/img/cert-nysba.png",
    year: "NYSBA Member",
  },
];

export const PRESS_LINKS: PressItem[] = [
  {
    name: "Forbes",
    topic: "Андрей Плаксин: визовый адвокат с бизнес-образованием и безупречной репутацией",
    url: "https://www.forbes.ru/reklama/303813-andrei-plaksin-vizovyi-advokat-s-biznes-obrazovaniem-i-bezuprechnoi-reputatsiei",
    type: "Деловая пресса",
  },
  {
    name: "Коммерсантъ",
    topic: "Экспертный комментарий по бизнес-иммиграции и визовой политике США",
    url: "https://www.kommersant.ru/doc/2836596",
    type: "Деловая пресса",
  },
  {
    name: "Deutsche Welle (DW)",
    topic: "Иммиграционная политика США и правила проверки заявителей",
    url: "http://p.dw.com/p/2bmH0",
    type: "Международные СМИ",
  },
  {
    name: "RTVI (США)",
    topic: "Телевизионный эфир: ответы иммиграционного адвоката в Нью-Йорке",
    url: "https://plaksinlaw.com/rtvi/",
    type: "Телевидение",
  },
  {
    name: "Интерфакс",
    topic: "Правовой анализ визовых категорий для предпринимателей и инвесторов",
    url: "http://interfax.com.ua/news/press-release/438446.html",
    type: "Информагентство",
  },
  {
    name: "Факты",
    topic: "Как переехать в США по визе O-1 или грин-карте EB-1",
    url: "https://fakty.ua/240161-kak-pereehat-v-ssha-po-vize-o-1-ili-eb-1",
    type: "Пресса",
  },
];

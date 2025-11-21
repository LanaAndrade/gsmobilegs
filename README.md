# SkillUpPlus 2030+

## Descrição

O SkillUpPlus 2030+ é um aplicativo móvel desenvolvido em React Native com o objetivo de apoiar trabalhadores e estudantes na requalificação profissional frente às transformações do mercado. Inspirado pelos ODS 4 (Educação de Qualidade) e ODS 8 (Trabalho Decente e Crescimento Econômico), o app conecta usuários a trilhas de aprendizado curtas, autoexplicativas e personalizadas com base em seus interesses e metas profissionais.

## Repositório GitHub

**URL:** (https://github.com/LanaAndrade/gsmobilegs)

## Integrantes

- **Caio Freitas** - RM553190
- **Enzzo Monteiro** - RM552616  
- **Lana Andrade** - RM552596

## Funcionalidades

- [x] Realizar autoavaliação de competências (Teste de Carreira)
- [x] Acompanhar trilhas de aprendizado em áreas emergentes
- [x] Monitorar progresso pessoal e gerar recomendações
- [x] Micro cursos gamificados para inclusão digital
- [x] Perfil personalizado com habilidades e interesses
- [x] Sistema de validação de dados do perfil
- [x] Navegação híbrida (Stack, Drawer e Tab Navigation)
- [x] Persistência de dados com AsyncStorage

## Tecnologias Utilizadas

| Tecnologia | Utilização |
|------------|------------|
| React Native | Framework principal |
| TypeScript | Linguagem de programação |
| React Navigation | Navegação (Stack, Drawer, Tab) |
| Async Storage | Persistência de dados |
| Expo | Ambiente de desenvolvimento |
| React Native Picker | Seleção de áreas de interesse |

## Estrutura de Navegação Híbrida

- **Stack Navigation**: Telas de Login, Splash, ValidateProfile
- **Drawer Navigation**: Menu lateral personalizado com todas as seções
- **Tab Navigation**: 5 abas inferiores (Home, Perfil, Teste, Recomendações, Microcursos)

## Componentes Implementados

| Componente | Aplicação no APP |
|------------|------------------|
| View | Estrutura das telas (containers de conteúdo) |
| ScrollView | Exibir longas listas de cursos e artigos |
| TextInput | Formulário de login e busca de cursos |
| Text | Exibição de rótulos, descrições e resultados |
| Button | Ações (entrar, salvar, iniciar curso) |
| TouchableOpacity | Botões personalizados e cards clicáveis |
| Image | Logotipo, ícones e banners de cursos |
| StyleSheet | Organização dos estilos de forma modular |
| Alert | Mensagens de erro (ex.: login inválido) |
| Picker | Selecionar áreas de interesse (IA, Gestão, Sustentabilidade) |
| Formulários/Telas | Navegação entre formulários/telas com uso de Hooks |
| Persistência de Dados | Usuário/senha e Perfil com AsyncStorage |

## Requisitos Atendidos da GS

### Documentação do APP (40 pontos)
- [x] Prints das telas do aplicativo no emulador
- [x] Estrutura de diretórios da aplicação  
- [x] Códigos-fonte principais (.tsx)
- [x] Explicação do fluxo de navegação e justificativas de design

### Navegação Híbrida (25 pontos)
- [x] **Stack Navigation**: Implementada em RootNavigation.tsx (Login, Splash, ValidateProfile)
- [x] **Drawer Navigation**: Implementada com menu lateral personalizado
- [x] **Tab Navigation**: 5 abas inferiores (Home, Perfil, Teste, Recomendações, Microcursos)

### Formulários Validados e Hooks (25 pontos)
- [x] **Validação de Login**: Email, senha e credenciais (Login.tsx)
- [x] **Validação de Perfil**: Campos obrigatórios e regras específicas (ValidateProfile.tsx)
- [x] **Validação do Quiz**: Processamento e cálculo de resultados (Quiz.tsx)
- [x] **Uso de Hooks**: useState, useEffect, useNavigation em todos os componentes
- [x] **Persistência**: AsyncStorage para usuário, perfil e resultados

### Organização do Código (10 pontos)
- [x] **Arquitetura modular**: Pastas screens, navigation, theme
- [x] **Tema centralizado**: theme.ts com cores e gradientes
- [x] **Componentes reutilizáveis**: Estilos consistentes e padronizados
- [x] **Boas práticas**: TypeScript, código limpo, componentes funcionais

## Alinhamento com ODS da ONU

- **ODS 4 - Educação de Qualidade**: Democratiza o acesso à capacitação tecnológica
- **ODS 8 - Trabalho Decente e Crescimento Econômico**: Fomenta empregabilidade e requalificação  
- **ODS 9 - Indústria, Inovação e Infraestrutura**: Incentiva o uso de tecnologias acessíveis
- **ODS 10 - Redução das Desigualdades**: Inclui públicos vulneráveis no aprendizado digital

## Estrutura do Projeto

src/
├── screens/          # Telas do aplicativo
│   ├── Login.tsx
│   ├── Home.tsx
│   ├── Profile.tsx
│   ├── Quiz.tsx
│   ├── Courses.tsx
│   ├── Recs.tsx
│   ├── Progress.tsx
│   ├── About.tsx
│   ├── ValidateProfile.tsx
│   └── SplashScreen.tsx
├── navigation/       # Configuração de navegação
│   ├── RootNavigation.tsx
│   └── CustomDrawerContent.tsx
└── theme/           # Configurações de tema
    ├── theme.ts
    └── colors.ts
    

## Instruções de Execução

```bash
# Instalar dependências
npm install

# Executar o projeto
npm start

# Para executar no emulador Android
npm run android

# Para executar no emulador iOS
npm run ios
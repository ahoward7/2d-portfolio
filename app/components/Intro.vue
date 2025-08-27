<template>
  <div class="flex flex-col gap-2">
    <div>{{ `<div class="text-5xl p-2">` }}</div>
    <div class="text-5xl pl-7 p-2">
      <CodeFunction>add</CodeFunction>
      <CodePunctuation>(</CodePunctuation>
      <CodeVariable>Creative</CodeVariable>
      <CodePunctuation>, </CodePunctuation>
      <CodeVariable>Logical</CodeVariable>
      <CodePunctuation>)</CodePunctuation>
      <CodeOperator> => </CodeOperator>
      <CodeString>"Web Developer"</CodeString>
      <CodePunctuation>;</CodePunctuation>
    </div>
    <div>{{ `</div>` }}</div>
  </div>
</template>
<template>
  <div class="flex flex-col gap-1 lg:gap-2">
    <div class="text-xs lg:text-base">
      {{ `<div class="text-5xl p-2">` }}
    </div>
    <!-- Small to md: function with brackets -->
    <div class="block lg:hidden text-base md:text-2xl pl-2 p-1">
      <div>
        <CodeKeyword>function </CodeKeyword>
        <CodeFunction>combine</CodeFunction>
        <CodePunctuation>(</CodePunctuation>
        <CodeVariable>Creativity</CodeVariable>
        <CodePunctuation>, </CodePunctuation>
        <CodeVariable>Logic</CodeVariable>
        <CodePunctuation>) {</CodePunctuation>
      </div>
      <div class="pl-4">
        <CodeKeyword>return </CodeKeyword>
        <CodeString>"Web Developer"</CodeString>
        <CodePunctuation>;</CodePunctuation>
      </div>
      <div>
        <CodePunctuation>}</CodePunctuation>
      </div>
    </div>

    <!-- lg and up: one-line arrow function -->
    <div class="hidden lg:block text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl pl-2 lg:pl-7 p-1 lg:p-2">
      <CodeFunction>combine</CodeFunction>
      <CodePunctuation>(</CodePunctuation>
      <CodeVariable>Creativity</CodeVariable>
      <CodePunctuation>, </CodePunctuation>
      <CodeVariable>Logic</CodeVariable>
      <CodePunctuation>)</CodePunctuation>
      <CodeOperator> => </CodeOperator>
      <CodeString>"Web Developer"</CodeString>
      <CodePunctuation>;</CodePunctuation>
    </div>
    <div class="text-xs lg:text-base">
      {{ `</div>` }}
    </div>
  </div>
</template>
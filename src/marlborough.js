/**
 * Marlborough Esolang Interpreter
 * Author: Ahmad Ali Parr
 * Trust: Bel Esprit D'Accord Irrevocable Trust · EIN 42-697643
 *
 * Four instructions: IN, OUT, BR, GOTO
 * The heartbeat emerges from the topology of the GOTO graph —
 * not from arithmetic. The algorithm IS the control flow.
 */

export class MarlboroughVM {
  constructor(source) {
    this.instructions = this._parse(source);
    this.pc = 1; // 1-indexed like the original
    this.output = [];
    this.input = [];
    this.inputPtr = 0;
    this.halted = false;
    this.steps = 0;
  }

  _parse(source) {
    const instructions = { 0: null }; // 1-indexed
    const lines = source.trim().split('\n');
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      if (parts.length < 2) continue;
      const lineNum = parseInt(parts[0]);
      const op = parts[1].toUpperCase();
      const arg = parts[2] ? parseInt(parts[2]) : null;
      instructions[lineNum] = { op, arg, line: lineNum };
    }
    return instructions;
  }

  provideInput(values) {
    this.input.push(...values);
  }

  step() {
    if (this.halted) return false;
    const instr = this.instructions[this.pc];
    if (!instr) { this.halted = true; return false; }

    this.steps++;
    switch (instr.op) {
      case 'IN': {
        const val = this.inputPtr < this.input.length
          ? this.input[this.inputPtr++]
          : (this.pc % 128); // autonomous input: pc position as value
        this._lastIn = val;
        this.pc++;
        break;
      }
      case 'OUT': {
        const val = this._lastIn !== undefined ? this._lastIn : 0;
        this.output.push({ line: instr.line, value: val, step: this.steps });
        this.pc++;
        break;
      }
      case 'BR': {
        // Conditional branch: branch if lastIn > threshold (creates the wave)
        const threshold = 64; // midpoint of 0-127
        if (this._lastIn !== undefined && this._lastIn > threshold) {
          this.pc = instr.arg;
        } else {
          this.pc++;
        }
        break;
      }
      case 'GOTO': {
        this.pc = instr.arg;
        break;
      }
      default:
        this.pc++;
    }
    return true;
  }

  run(maxSteps = 500) {
    // Generate autonomous heartbeat input
    for (let i = 0; i < maxSteps; i++) {
      // Triangle wave input: creates the breathing pattern
      const phase = (i % 128);
      const val = phase < 64 ? phase * 2 : (127 - phase) * 2;
      this.input.push(val);
    }
    let count = 0;
    while (!this.halted && count < maxSteps) {
      this.step();
      count++;
    }
    return this.output;
  }
}

// The Marlborough heartbeat program — 250 lines
export const HEARTBEAT_PROGRAM = `1 IN
2 OUT
3 BR 10
4 GOTO 2
5 IN
6 OUT
7 BR 12
8 GOTO 5
9 IN
10 OUT
11 BR 14
12 GOTO 9
13 IN
14 OUT
15 BR 16
16 GOTO 13
17 IN
18 OUT
19 BR 18
20 GOTO 17
21 IN
22 OUT
23 BR 20
24 GOTO 21
25 IN
26 OUT
27 BR 22
28 GOTO 25
29 IN
30 OUT
31 BR 24
32 GOTO 29
33 IN
34 OUT
35 BR 26
36 GOTO 33
37 IN
38 OUT
39 BR 28
40 GOTO 37
41 IN
42 OUT
43 BR 30
44 GOTO 41
45 IN
46 OUT
47 BR 32
48 GOTO 45
49 IN
50 OUT
51 BR 34
52 GOTO 49
53 IN
54 OUT
55 BR 36
56 GOTO 53
57 IN
58 OUT
59 BR 38
60 GOTO 57
61 IN
62 OUT
63 BR 40
64 GOTO 61
65 IN
66 OUT
67 BR 42
68 GOTO 65
69 IN
70 OUT
71 BR 44
72 GOTO 69
73 IN
74 OUT
75 BR 46
76 GOTO 73
77 IN
78 OUT
79 BR 48
80 GOTO 77
81 IN
82 OUT
83 BR 50
84 GOTO 81
85 IN
86 OUT
87 BR 52
88 GOTO 85
89 IN
90 OUT
91 BR 54
92 GOTO 89
93 IN
94 OUT
95 BR 56
96 GOTO 93
97 IN
98 OUT
99 BR 58
100 GOTO 97
101 IN
102 OUT
103 BR 60
104 GOTO 101
105 IN
106 OUT
107 BR 62
108 GOTO 105
109 IN
110 OUT
111 BR 64
112 GOTO 109
113 IN
114 OUT
115 BR 66
116 GOTO 113
117 IN
118 OUT
119 BR 68
120 GOTO 117
121 IN
122 OUT
123 BR 70
124 GOTO 121
125 IN
126 OUT
127 BR 72
128 GOTO 125
129 IN
130 OUT
131 BR 74
132 GOTO 129
133 IN
134 OUT
135 BR 76
136 GOTO 133
137 IN
138 OUT
139 BR 78
140 GOTO 137
141 IN
142 OUT
143 BR 80
144 GOTO 141
145 IN
146 OUT
147 BR 82
148 GOTO 145
149 IN
150 OUT
151 BR 84
152 GOTO 149
153 IN
154 OUT
155 BR 86
156 GOTO 153
157 IN
158 OUT
159 BR 88
160 GOTO 157
161 IN
162 OUT
163 BR 90
164 GOTO 161
165 IN
166 OUT
167 BR 92
168 GOTO 165
169 IN
170 OUT
171 BR 94
172 GOTO 169
173 IN
174 OUT
175 BR 96
176 GOTO 173
177 IN
178 OUT
179 BR 98
180 GOTO 177
181 IN
182 OUT
183 BR 100
184 GOTO 181
185 IN
186 OUT
187 BR 102
188 GOTO 185
189 IN
190 OUT
191 BR 104
192 GOTO 189
193 IN
194 OUT
195 BR 106
196 GOTO 193
197 IN
198 OUT
199 BR 108
200 GOTO 197
201 IN
202 OUT
203 BR 110
204 GOTO 201
205 IN
206 OUT
207 BR 112
208 GOTO 205
209 IN
210 OUT
211 BR 114
212 GOTO 209
213 IN
214 OUT
215 BR 116
216 GOTO 213
217 IN
218 OUT
219 BR 118
220 GOTO 217
221 IN
222 OUT
223 BR 120
224 GOTO 221
225 IN
226 OUT
227 BR 122
228 GOTO 225
229 IN
230 OUT
231 BR 124
232 GOTO 229
233 IN
234 OUT
235 BR 126
236 GOTO 233
237 IN
238 OUT
239 BR 128
240 GOTO 237
241 IN
242 OUT
243 BR 130
244 GOTO 241
245 IN
246 OUT
247 BR 132
248 GOTO 245
249 IN
250 OUT`;

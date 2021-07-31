//#include <conio>
#include <iostream>
#include <string>
#include <cstring>
#define null 0
//using namespace std
namespace train
{
    class reserve
    {
    private:
        struct passenger
        {
            int seatno, age;
            char na[15];
        } p[10][5];
        struct detail
        {

            int h, t, count, sr;
        } d[10];

    public:
        reserve();
        int enqueue(int);
        int isqueuefull(int);
        int isqueueempty(int);
        int dequeue();
        void display(int);
        void disp();
        ~reserve();
    };
}
//#include "q1h.h"

using namespace train;

reserve::reserve()
{
    for (int v = 0; v < 10; v++)
    {
        d[v].count = 0;
        d[v].h = 0;
        d[v].sr = 0;
        d[v].t = -1;
    }
}

int reserve::isqueueempty(int n3)
{
    return (d[n3].count == 0 ? 1 : 0);
}

int reserve::isqueuefull(int n3)
{
    return (d[n3].count == (3 + d[n3].sr) ? 1 : 0);
}

int reserve::enqueue(int t1)

{

    int i, m1, s, g, u;
    char ch, ch1;
    if (t1 == -1)
    {
        disp();
        std::cout << "Enter the row which is to be enqueued:";
        std::cin >> i;
        i = i - 1;
        m1 = i;
        t1++;
    }
    else
    {
        m1 = t1;
        i = 5;
    }
    s = t1 + i;
    u = 5 + t1;
    if (d[s].sr < 2)
    {
        std::cout << " Do you belong to special reservation category say y o n : ";
        std::cin >>
            ch;
        if (ch == 'y')
            d[s].sr++;
    }
    if (!isqueuefull(s) || !isqueuefull(m1))
    {

        if (isqueueempty((5 + m1)) || (isqueuefull(m1) && !isqueueempty((5 + m1))))

        {
            d[s].t = (d[s].t + 1) % 5;
            d[s].count++;
            std::cout << " Enter the name of the passenger : ";
            std::cin >>
                p[s][d[s].t].na;
            std::cout << " Enter the age of the passenger : ";
            std::cin >>
                p[s][d[s].t].age;
            if (p[s][d[s].t].age > 110)
            {
                std::cout << " INVALID DATA Enter the age of the passenger : ";
                std::cin >>
                    p[s][d[s].t].age;
            }
            std::cout << " Enter the ticket number of the passenger : ";
            std::cin >>
                p[s][d[s].t].seatno;
        }

        else

        {
            d[t1].t = (d[t1].t + 1) % 5;
            strcpy(p[t1][d[t1].t].na, p[u][d[u].h].na);
            p[t1][d[t1].t].age = p[u][d[u].h].age;
            p[t1][d[t1].t].seatno = p[u][d[u].h].seatno;
            std::cout << " " << p[u][d[u].h].na << " is removed from the waiting list ";
            d[u]
                .h = (d[u].h + 1) % 5;
            d[u].count--;
            d[t1].count++;
        }
    }

    else
    {

        std::cout << " Queue is full.You cannot reserve...... ";
        if (!isqueuefull(5 + m1))
        {
            std::cout << " Do you want to be in the waiting list : ";
            std::cin >>
                ch1;

            if (ch1 == 'y')
                g = enqueue(m1);
        }
    }
    return d[s].t;
}

int reserve::dequeue()
{
    int n2, g;
    std::cout << " Enter the queue which has to be dequeued : ";
    disp();
    std::cin >> n2;
    n2 = n2 - 1;
    if (!isqueueempty(n2))
    {
        std::cout << " The service is provided to customer " << p[n2][d[n2].h].na;
        d[n2]
            .h = (d[n2].h + 1) % 5;
        d[n2].count = d[n2].count - 1;
        if (!isqueueempty(n2 + 5))
            g = enqueue(n2);
    }
    else
        std::cout << " There are no passengers.You cannot provide service..";
    return d[n2]
        .h;
}

void reserve::display(int i1)
{
    i1--;
    int i = d[i1].h, j = 1;

    std::cout << "=======================================================";
    std::cout << " NAME : AGE : SEATNO : ";

    while (j <= d[i1].count)
    {

        std::cout << " " << p[i1][i].na << " " << p[i1][i].age << " " << p[i1][i].seatno;
        i = (i + 1) % 5;
        j++;
    }
    std::cout << "=======================================================";
}

void reserve::disp()
{
    std::cout << " SEDHU EXPRESS FROM : THOOTHUKUDI TO : SALEM ";
    std::cout << " BAGATH EXPRESS FROM : THENI TO : BANGALORE ";
    std::cout << " HOWRAH EXPRESS FROM : AGRA TO : DELHI ";
    std::cout << " RAJDHANI EXPRESS FROM : BIHAR TO : ORISSA ";
    std::cout << " PANDIAN EXPRESS FROM : CHENNAI TO : TRICHY ";
    std::cout << " Enter your choice : ";
}

reserve::~reserve()

{
}
//#include "q1h.h"

int main()
{
    int n, nn = 1, m, t = 0, k;
    char ch;
    train::reserve r;
    while (nn == 1)
    {
        std::cout << "Do you want to reserve Enter either 1 or cancel Enter either 2 or display Enter either 3:";
        std::cin >> n;
        switch (n)
        {
        case 1:
            k = r.enqueue(-1);
            break;
        case 2:
            k = r.dequeue();
            break;
        case 3:

            std::cout << " Do you want to display all say y or n(if waiting list press w) : ";
            std::cin >>
                ch;
            if (ch == 'y')
            {
                m = 0;

                while (m < 5)
                {
                    r.display(m);
                    m++;
                }
            }
            else
            {
                r.disp();
                std::cout << " Enter the choice ";
                std::cin >> m;
            }
            if (ch == 'w')

                r.display(5 + m);
            if (ch == 'n')
                r.display(m);
            break;
        }

        std::cout << " do you want to continue press 1 : ";
        std::cin >>
            nn;
    }
    return 0;
}
